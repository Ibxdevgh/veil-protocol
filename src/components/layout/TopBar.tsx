"use client";

import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { formatAddress } from "@/lib/utils";
import { SOLANA_NETWORK } from "@/lib/constants";
import { Wifi } from "lucide-react";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function TopBar() {
  const { publicKey } = useWallet();

  return (
    <header className="h-16 border-b border-veil-border bg-veil-bg/75 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-veil-elevated border border-veil-border">
          <Wifi className="w-3 h-3 text-veil-green" />
          <span className="font-jetbrains text-[0.7rem] font-medium text-veil-text-secondary uppercase tracking-wider">
            {SOLANA_NETWORK}
          </span>
        </div>
        {publicKey && (
          <span className="font-jetbrains text-[0.72rem] text-veil-text-muted">
            {formatAddress(publicKey.toBase58(), 6)}
          </span>
        )}
      </div>
      <WalletMultiButton />
    </header>
  );
}
