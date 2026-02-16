"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { DisclosureField } from "@/types/transaction";
import { useShieldTransfer } from "@/hooks/useShieldTransfer";
import RecipientInput from "./RecipientInput";
import AmountInput from "./AmountInput";
import DisclosureSelector from "./DisclosureSelector";
import TransactionStatus from "./TransactionStatus";
import { Shield, Loader2 } from "lucide-react";

export default function ShieldForm() {
  const { publicKey } = useWallet();
  const { execute, reset, status, error, currentTx, currentProof } =
    useShieldTransfer();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("SOL");
  const [disclosedFields, setDisclosedFields] = useState<DisclosureField[]>([
    "compliance_status",
  ]);
  const [recipientError, setRecipientError] = useState("");
  const [amountError, setAmountError] = useState("");

  const validate = (): boolean => {
    let valid = true;

    try {
      new PublicKey(recipient);
      setRecipientError("");
    } catch {
      setRecipientError("Invalid Solana address");
      valid = false;
    }

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setAmountError("Enter a valid amount");
      valid = false;
    } else {
      setAmountError("");
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await execute({
        recipient,
        amount: parseFloat(amount),
        token,
        disclosedFields,
      });
    } catch {
      // Error handled by hook
    }
  };

  const handleReset = () => {
    reset();
    setRecipient("");
    setAmount("");
    setToken("SOL");
    setDisclosedFields(["compliance_status"]);
  };

  const isProcessing = ["signing", "confirming", "proving"].includes(status);

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold tracking-tight">
          Shield Transfer
        </h1>
        <p className="text-sm text-veil-text-secondary mt-1">
          Send SOL through VEIL with selective disclosure compliance proofs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
        <RecipientInput
          value={recipient}
          onChange={setRecipient}
          error={recipientError}
        />

        <AmountInput
          value={amount}
          onChange={setAmount}
          token={token}
          onTokenChange={setToken}
          error={amountError}
        />

        <DisclosureSelector
          selected={disclosedFields}
          onChange={setDisclosedFields}
        />

        <div className="pt-2">
          {status === "completed" ? (
            <button
              type="button"
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-veil-green text-veil-bg font-jetbrains text-sm font-semibold tracking-wide hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all"
            >
              <Shield className="w-4 h-4" />
              New Transfer
            </button>
          ) : (
            <button
              type="submit"
              disabled={!publicKey || isProcessing}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-veil-green text-veil-bg font-jetbrains text-sm font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Shield className="w-4 h-4" />
              )}
              {!publicKey
                ? "Connect Wallet"
                : isProcessing
                ? "Processing..."
                : "Shield & Send"}
            </button>
          )}
        </div>
      </form>

      <TransactionStatus
        status={status}
        signature={currentTx?.signature}
        error={error || undefined}
        network={currentTx?.network}
      />

      {currentProof && status === "completed" && (
        <div className="glass-card p-5">
          <h3 className="font-jetbrains text-[0.78rem] font-semibold text-veil-green mb-3">
            Compliance Proof Generated
          </h3>
          <div className="space-y-2 text-[0.72rem] font-jetbrains">
            <div className="flex justify-between">
              <span className="text-veil-text-muted">Proof ID</span>
              <span className="text-veil-text-secondary">
                {currentProof.id.slice(0, 20)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-veil-text-muted">Type</span>
              <span className="text-veil-text-secondary">
                Groth16 / BN254
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-veil-text-muted">AML Check</span>
              <span className="text-veil-green">
                {currentProof.attestations.amlCheck.status.toUpperCase()} (
                {(currentProof.attestations.amlCheck.score * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-veil-text-muted">Sanctions</span>
              <span className="text-veil-green">
                {currentProof.attestations.sanctionsCheck.status.toUpperCase()} (
                {(currentProof.attestations.sanctionsCheck.score * 100).toFixed(
                  1
                )}
                %)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-veil-text-muted">Disclosed</span>
              <span className="text-veil-text-secondary">
                {currentProof.disclosedFields.length} field
                {currentProof.disclosedFields.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
