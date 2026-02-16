import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { STEALTH_PROGRAM_ID } from "@/lib/constants";
import { deriveVaultPda } from "./vault";

export async function buildShieldTransferInstruction(
  sender: PublicKey,
  recipient: PublicKey,
  amountSol: number,
  connection: Connection
): Promise<{ transaction: Transaction; vaultPda: string }> {
  const nonce = Date.now();
  const [vaultPda] = deriveVaultPda(sender, nonce);

  // For MVP: use a simple SOL transfer as the on-chain tx.
  // The stealth program's actual CPI routing is complex —
  // the privacy UX (proof generation, disclosure selection) is the point.
  const lamports = Math.floor(amountSol * LAMPORTS_PER_SOL);

  const transferIx = SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports,
  });

  // Add a memo-like instruction referencing the vault PDA for traceability
  const veilMemoIx = new TransactionInstruction({
    keys: [{ pubkey: sender, isSigner: true, isWritable: false }],
    programId: STEALTH_PROGRAM_ID,
    data: Buffer.from(
      JSON.stringify({
        type: "shield_transfer",
        vault: vaultPda.toBase58(),
        nonce,
      })
    ),
  });

  const tx = new Transaction();
  tx.add(transferIx);

  // Only add the memo ix if we're on devnet (the program may not be deployed there)
  // On mainnet, include the stealth program reference
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK;
  if (network === "mainnet-beta") {
    tx.add(veilMemoIx);
  }

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = sender;

  return { transaction: tx, vaultPda: vaultPda.toBase58() };
}
