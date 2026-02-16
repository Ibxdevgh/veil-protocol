"use client";

import { TransactionStatus as TxStatus } from "@/types/transaction";
import { cn } from "@/lib/utils";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Shield,
  Pen,
  Radio,
} from "lucide-react";

interface Props {
  status: TxStatus;
  signature?: string;
  error?: string;
  network?: string;
}

const STEPS: { status: TxStatus; label: string; icon: typeof Shield }[] = [
  { status: "signing", label: "Signing Transaction", icon: Pen },
  { status: "confirming", label: "Confirming On-Chain", icon: Radio },
  { status: "proving", label: "Generating ZK Proof", icon: Shield },
  { status: "completed", label: "Shield Complete", icon: CheckCircle2 },
];

export default function TransactionStatus({
  status,
  signature,
  error,
  network = "devnet",
}: Props) {
  if (status === "pending") return null;

  const currentIdx = STEPS.findIndex((s) => s.status === status);

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = step.status === status;
          const isDone = i < currentIdx || status === "completed";
          const isFailed = status === "failed" && i === currentIdx;

          return (
            <div key={step.status} className="flex items-center gap-3">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                  isDone && "bg-veil-green-dim",
                  isActive && !isFailed && "bg-veil-violet-dim",
                  isFailed && "bg-red-500/10",
                  !isDone && !isActive && "bg-veil-surface"
                )}
              >
                {isActive && !isDone && !isFailed ? (
                  <Loader2 className="w-3.5 h-3.5 text-veil-violet animate-spin" />
                ) : isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-veil-green" />
                ) : isFailed ? (
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5",
                      isDone ? "text-veil-green" : "text-veil-text-muted"
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "font-jetbrains text-[0.78rem] font-medium",
                  isDone && "text-veil-green",
                  isActive && !isFailed && "text-veil-violet",
                  isFailed && "text-red-400",
                  !isDone && !isActive && "text-veil-text-muted"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {signature && (
        <div className="pt-3 border-t border-veil-border">
          <span className="font-jetbrains text-[0.68rem] text-veil-text-muted">
            Signature:{" "}
          </span>
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=${network}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-jetbrains text-[0.68rem] text-veil-green hover:underline"
          >
            {signature.slice(0, 16)}...{signature.slice(-8)}
          </a>
        </div>
      )}

      {error && (
        <div className="pt-3 border-t border-veil-border">
          <p className="font-jetbrains text-[0.72rem] text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
