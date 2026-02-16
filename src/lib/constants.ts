import { PublicKey } from "@solana/web3.js";

export const STEALTH_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_STEALTH_PROGRAM_ID ||
    "3UYHkPExJMjUSHmK9jKWnfEkbJw3bAwsEx3hhwbp3zcA"
);

export const SOLANA_NETWORK =
  process.env.NEXT_PUBLIC_SOLANA_NETWORK || "mainnet-beta";

export const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL || "https://api.mainnet-beta.solana.com";

export const STORAGE_KEYS = {
  TRANSACTIONS: "veil_transactions",
  POLICIES: "veil_policies",
  API_KEYS: "veil_api_keys",
} as const;

export const DISCLOSURE_FIELD_LABELS: Record<string, string> = {
  sender: "Sender Address",
  recipient: "Recipient Address",
  amount: "Transfer Amount",
  timestamp: "Transaction Time",
  purpose: "Transaction Purpose",
  jurisdiction: "Jurisdiction",
  compliance_status: "Compliance Status",
};
