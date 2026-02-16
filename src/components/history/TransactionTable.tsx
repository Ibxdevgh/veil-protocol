"use client";

import { useState } from "react";
import { ShieldedTransaction } from "@/types/transaction";
import { cn, formatAddress, formatDate } from "@/lib/utils";
import { ExternalLink, Eye, ArrowUpDown } from "lucide-react";

interface Props {
  transactions: ShieldedTransaction[];
  onViewProof: (txId: string, proofId: string) => void;
}

type SortField = "timestamp" | "amount" | "status";

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-veil-green-dim text-veil-green",
  pending: "bg-yellow-500/10 text-yellow-400",
  signing: "bg-veil-violet-dim text-veil-violet",
  confirming: "bg-veil-violet-dim text-veil-violet",
  proving: "bg-veil-violet-dim text-veil-violet",
  failed: "bg-red-500/10 text-red-400",
};

export default function TransactionTable({ transactions, onViewProof }: Props) {
  const [sortField, setSortField] = useState<SortField>("timestamp");
  const [sortAsc, setSortAsc] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const filtered = transactions.filter(
    (tx) => filter === "all" || tx.status === filter
  );

  const sorted = [...filtered].sort((a, b) => {
    const mul = sortAsc ? 1 : -1;
    if (sortField === "timestamp") return (a.timestamp - b.timestamp) * mul;
    if (sortField === "amount") return (a.amount - b.amount) * mul;
    return a.status.localeCompare(b.status) * mul;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="font-jetbrains text-sm text-veil-text-muted">
          No transactions yet. Shield your first transfer to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2">
        {["all", "completed", "pending", "failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full font-jetbrains text-[0.7rem] font-medium uppercase tracking-wider transition-all",
              filter === f
                ? "bg-veil-green-dim text-veil-green border border-veil-green/30"
                : "bg-veil-surface text-veil-text-muted border border-veil-border hover:border-veil-border-hover"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-veil-border">
              {[
                { label: "Time", field: "timestamp" as SortField },
                { label: "Recipient", field: null },
                { label: "Amount", field: "amount" as SortField },
                { label: "Status", field: "status" as SortField },
                { label: "", field: null },
              ].map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left font-jetbrains text-[0.68rem] font-semibold text-veil-text-muted uppercase tracking-wider"
                >
                  {col.field ? (
                    <button
                      onClick={() => toggleSort(col.field!)}
                      className="flex items-center gap-1 hover:text-veil-text-secondary transition-colors"
                    >
                      {col.label}
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-veil-border last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-3 font-jetbrains text-[0.75rem] text-veil-text-secondary">
                  {formatDate(tx.timestamp)}
                </td>
                <td className="px-4 py-3 font-jetbrains text-[0.75rem] text-veil-text">
                  {formatAddress(tx.recipient, 6)}
                </td>
                <td className="px-4 py-3 font-jetbrains text-[0.75rem] text-veil-text font-medium">
                  {tx.amount} {tx.token}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex px-2.5 py-1 rounded-full font-jetbrains text-[0.65rem] font-semibold uppercase tracking-wider",
                      STATUS_STYLES[tx.status] || STATUS_STYLES.pending
                    )}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    {tx.proofId && (
                      <button
                        onClick={() => onViewProof(tx.id, tx.proofId!)}
                        className="p-1.5 rounded-veil-xs hover:bg-veil-green-dim text-veil-text-muted hover:text-veil-green transition-all"
                        title="View proof"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {tx.signature && (
                      <a
                        href={`https://explorer.solana.com/tx/${tx.signature}?cluster=${tx.network}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-veil-xs hover:bg-veil-violet-dim text-veil-text-muted hover:text-veil-violet transition-all"
                        title="View on Explorer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
