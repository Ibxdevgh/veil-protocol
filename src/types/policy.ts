import { DisclosureField } from "./transaction";

export interface DisclosurePolicy {
  id: string;
  name: string;
  description: string;
  disclosedFields: DisclosureField[];
  isPreset: boolean;
  createdAt: number;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  key: string;
  createdAt: number;
  lastUsedAt: number | null;
  isActive: boolean;
}

export const POLICY_PRESETS: Omit<DisclosurePolicy, "id" | "createdAt">[] = [
  {
    name: "Max Privacy",
    description: "Disclose only compliance status. Maximum transaction privacy.",
    disclosedFields: ["compliance_status"],
    isPreset: true,
  },
  {
    name: "Regulatory Compliant",
    description:
      "Disclose compliance status, jurisdiction, and timestamp. Meets most regulatory requirements.",
    disclosedFields: ["compliance_status", "jurisdiction", "timestamp"],
    isPreset: true,
  },
  {
    name: "Full Transparency",
    description:
      "Disclose all fields. Suitable for public-facing transactions.",
    disclosedFields: [
      "sender",
      "recipient",
      "amount",
      "timestamp",
      "purpose",
      "jurisdiction",
      "compliance_status",
    ],
    isPreset: true,
  },
];
