export type DisclosureField =
  | "sender"
  | "recipient"
  | "amount"
  | "timestamp"
  | "purpose"
  | "jurisdiction"
  | "compliance_status";

export type TransactionStatus =
  | "pending"
  | "signing"
  | "confirming"
  | "proving"
  | "completed"
  | "failed";

export interface ShieldedTransaction {
  id: string;
  signature: string;
  sender: string;
  recipient: string;
  amount: number;
  token: string;
  status: TransactionStatus;
  disclosedFields: DisclosureField[];
  proofId: string | null;
  timestamp: number;
  network: string;
  vaultPda: string | null;
  error?: string;
}
