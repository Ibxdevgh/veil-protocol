"use client";

import { Coins } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  token: string;
  onTokenChange: (t: string) => void;
  error?: string;
}

const TOKENS = [
  { value: "SOL", label: "SOL", available: true },
  { value: "USDC", label: "USDC", available: false },
  { value: "USDT", label: "USDT", available: false },
];

export default function AmountInput({
  value,
  onChange,
  token,
  onTokenChange,
  error,
}: Props) {
  return (
    <div>
      <label className="block font-jetbrains text-[0.72rem] font-medium text-veil-text-secondary uppercase tracking-wider mb-2">
        Amount
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-veil-text-muted" />
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0.00"
            step="0.001"
            min="0"
            className="w-full bg-veil-surface border border-veil-border rounded-veil-sm py-3 pl-10 pr-4 font-jetbrains text-sm text-veil-text placeholder:text-veil-text-muted focus:outline-none focus:border-veil-green focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <select
          value={token}
          onChange={(e) => onTokenChange(e.target.value)}
          className="bg-veil-surface border border-veil-border rounded-veil-sm px-4 py-3 font-jetbrains text-sm text-veil-text focus:outline-none focus:border-veil-green transition-all cursor-pointer"
        >
          {TOKENS.map((t) => (
            <option key={t.value} value={t.value} disabled={!t.available}>
              {t.label}{!t.available ? " (soon)" : ""}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-1 font-jetbrains text-[0.7rem] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
