"use client";

import { User } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export default function RecipientInput({ value, onChange, error }: Props) {
  return (
    <div>
      <label className="block font-jetbrains text-[0.72rem] font-medium text-veil-text-secondary uppercase tracking-wider mb-2">
        Recipient
      </label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-veil-text-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Solana address or .sol domain"
          className="w-full bg-veil-surface border border-veil-border rounded-veil-sm py-3 pl-10 pr-4 font-jetbrains text-sm text-veil-text placeholder:text-veil-text-muted focus:outline-none focus:border-veil-green focus:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all"
        />
      </div>
      {error && (
        <p className="mt-1 font-jetbrains text-[0.7rem] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
