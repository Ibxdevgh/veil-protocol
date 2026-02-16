export interface ComplianceProof {
  id: string;
  transactionId: string;
  proofType: "groth16";
  curve: "bn254";
  proof: {
    pi_a: string[];
    pi_b: string[][];
    pi_c: string[];
  };
  publicInputs: string[];
  attestations: {
    amlCheck: AttestationResult;
    sanctionsCheck: AttestationResult;
    jurisdictionCheck: AttestationResult;
  };
  disclosedFields: string[];
  generatedAt: number;
  verifiedAt: number | null;
  isValid: boolean;
}

export interface AttestationResult {
  provider: string;
  status: "pass" | "fail" | "pending";
  score: number;
  timestamp: number;
}
