"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ComplianceProof } from "@/types/proof";
import { verifyComplianceProof } from "@/lib/zk/proof";
import { DISCLOSURE_FIELD_LABELS } from "@/lib/constants";
import { formatDate, cn } from "@/lib/utils";
import {
  X,
  CheckCircle2,
  Shield,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

interface Props {
  proof: ComplianceProof | null;
  open: boolean;
  onClose: () => void;
}

export default function ProofDetailModal({ proof, open, onClose }: Props) {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!proof) return null;

  const handleVerify = async () => {
    setVerifying(true);
    await verifyComplianceProof(proof);
    setVerifying(false);
    setVerified(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(proof, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[85vh] overflow-y-auto bg-veil-elevated border border-veil-border rounded-veil p-6 z-50">
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="font-syne text-lg font-bold">
              Compliance Proof
            </Dialog.Title>
            <Dialog.Close className="p-1 rounded hover:bg-white/5 text-veil-text-muted hover:text-veil-text transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {/* Proof metadata */}
          <div className="space-y-3 mb-5">
            <Row label="Proof ID" value={proof.id} />
            <Row label="Type" value={`${proof.proofType} / ${proof.curve}`} />
            <Row label="Generated" value={formatDate(proof.generatedAt)} />
            <Row
              label="Verified"
              value={
                proof.verifiedAt
                  ? formatDate(proof.verifiedAt)
                  : verified
                  ? "Just now"
                  : "Not yet"
              }
            />
          </div>

          {/* Attestations */}
          <div className="mb-5">
            <h4 className="font-jetbrains text-[0.72rem] font-semibold text-veil-text-secondary uppercase tracking-wider mb-3">
              Attestations
            </h4>
            <div className="space-y-2">
              {Object.entries(proof.attestations).map(([key, att]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 px-3 rounded-veil-xs bg-veil-surface"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className={cn(
                        "w-3.5 h-3.5",
                        att.status === "pass"
                          ? "text-veil-green"
                          : "text-red-400"
                      )}
                    />
                    <span className="font-jetbrains text-[0.75rem] text-veil-text">
                      {att.provider}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "font-jetbrains text-[0.7rem] font-semibold",
                      att.status === "pass"
                        ? "text-veil-green"
                        : "text-red-400"
                    )}
                  >
                    {(att.score * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclosed fields */}
          <div className="mb-5">
            <h4 className="font-jetbrains text-[0.72rem] font-semibold text-veil-text-secondary uppercase tracking-wider mb-3">
              Disclosed Fields
            </h4>
            <div className="flex flex-wrap gap-2">
              {proof.disclosedFields.map((field) => (
                <span
                  key={field}
                  className="px-2.5 py-1 rounded-full bg-veil-green-dim text-veil-green font-jetbrains text-[0.68rem] font-medium"
                >
                  {DISCLOSURE_FIELD_LABELS[field] || field}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleVerify}
              disabled={verifying || verified}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-jetbrains text-[0.78rem] font-semibold transition-all",
                verified
                  ? "bg-veil-green-dim text-veil-green"
                  : "bg-veil-green text-veil-bg hover:shadow-[0_0_24px_rgba(16,185,129,0.3)]"
              )}
            >
              {verifying ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : verified ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Shield className="w-3.5 h-3.5" />
              )}
              {verified ? "Verified" : verifying ? "Verifying..." : "Verify Proof"}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-veil-border text-veil-text-secondary font-jetbrains text-[0.78rem] font-medium hover:border-veil-border-hover transition-all"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-veil-green" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied" : "Copy JSON"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-jetbrains text-[0.72rem] text-veil-text-muted">
        {label}
      </span>
      <span className="font-jetbrains text-[0.72rem] text-veil-text-secondary font-medium">
        {value}
      </span>
    </div>
  );
}
