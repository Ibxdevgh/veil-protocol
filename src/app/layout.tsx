import type { Metadata } from "next";
import { WalletProvider } from "@/components/providers/WalletProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "VEIL — Private Payments. Public Compliance.",
  description:
    "Privacy infrastructure for the agentic economy. ZK-powered selective disclosure so AI agents transact privately while staying fully compliant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
