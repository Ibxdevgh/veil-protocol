"use client";

import { useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { ShieldedTransaction, TransactionStatus, DisclosureField } from "@/types/transaction";
import { ComplianceProof } from "@/types/proof";
import { buildShieldTransferInstruction } from "@/lib/stealth/program";
import { generateComplianceProof } from "@/lib/zk/proof";
import { saveTransaction } from "@/lib/storage/transactions";
import { generateId, sleep } from "@/lib/utils";
import { SOLANA_NETWORK } from "@/lib/constants";

interface TransferParams {
  recipient: string;
  amount: number;
  token: string;
  disclosedFields: DisclosureField[];
}

interface TransferResult {
  transaction: ShieldedTransaction;
  proof: ComplianceProof;
}

export function useShieldTransfer() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [status, setStatus] = useState<TransactionStatus>("pending");
  const [error, setError] = useState<string | null>(null);
  const [currentTx, setCurrentTx] = useState<ShieldedTransaction | null>(null);
  const [currentProof, setCurrentProof] = useState<ComplianceProof | null>(null);

  const execute = useCallback(
    async (params: TransferParams): Promise<TransferResult> => {
      if (!publicKey) throw new Error("Wallet not connected");

      const txId = generateId();
      setError(null);

      const tx: ShieldedTransaction = {
        id: txId,
        signature: "",
        sender: publicKey.toBase58(),
        recipient: params.recipient,
        amount: params.amount,
        token: params.token,
        status: "pending",
        disclosedFields: params.disclosedFields,
        proofId: null,
        timestamp: Date.now(),
        network: SOLANA_NETWORK,
        vaultPda: null,
      };

      setCurrentTx(tx);

      try {
        // Step 1: Build transaction
        setStatus("signing");
        tx.status = "signing";
        setCurrentTx({ ...tx });

        const recipientKey = new PublicKey(params.recipient);
        const { transaction, vaultPda } = await buildShieldTransferInstruction(
          publicKey,
          recipientKey,
          params.amount,
          connection
        );
        tx.vaultPda = vaultPda;

        // Step 2: Sign and send
        setStatus("confirming");
        tx.status = "confirming";
        setCurrentTx({ ...tx });

        const signature = await sendTransaction(transaction, connection);
        tx.signature = signature;

        // Step 3: Confirm via polling (no WebSocket needed)
        for (let i = 0; i < 30; i++) {
          const { value } = await connection.getSignatureStatuses([signature]);
          const status = value?.[0];
          if (status?.confirmationStatus === "confirmed" || status?.confirmationStatus === "finalized") {
            break;
          }
          if (status?.err) {
            throw new Error("Transaction failed on-chain");
          }
          await sleep(2000);
          if (i === 29) throw new Error("Transaction confirmation timed out");
        }

        // Step 4: Generate compliance proof
        setStatus("proving");
        tx.status = "proving";
        setCurrentTx({ ...tx });

        const proof = await generateComplianceProof(txId, params.disclosedFields);
        tx.proofId = proof.id;

        // Step 5: Complete
        tx.status = "completed";
        setStatus("completed");
        setCurrentTx({ ...tx });
        setCurrentProof(proof);

        // Persist
        saveTransaction(tx);
        if (typeof window !== "undefined") {
          const proofs = JSON.parse(localStorage.getItem("veil_proofs") || "{}");
          proofs[proof.id] = proof;
          localStorage.setItem("veil_proofs", JSON.stringify(proofs));
        }

        return { transaction: tx, proof };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Transaction failed";
        tx.status = "failed";
        tx.error = message;
        setStatus("failed");
        setError(message);
        setCurrentTx({ ...tx });
        saveTransaction(tx);
        throw err;
      }
    },
    [publicKey, connection, sendTransaction]
  );

  const reset = useCallback(() => {
    setStatus("pending");
    setError(null);
    setCurrentTx(null);
    setCurrentProof(null);
  }, []);

  return { execute, reset, status, error, currentTx, currentProof };
}
