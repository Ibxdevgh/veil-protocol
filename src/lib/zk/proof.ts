import { ComplianceProof, AttestationResult } from "@/types/proof";
import { DisclosureField } from "@/types/transaction";
import { generateId, sleep } from "@/lib/utils";

function randomHex(len: number): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(len)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateGroth16Proof() {
  return {
    pi_a: [`0x${randomHex(32)}`, `0x${randomHex(32)}`],
    pi_b: [
      [`0x${randomHex(32)}`, `0x${randomHex(32)}`],
      [`0x${randomHex(32)}`, `0x${randomHex(32)}`],
    ],
    pi_c: [`0x${randomHex(32)}`, `0x${randomHex(32)}`],
  };
}

function generateAttestation(provider: string): AttestationResult {
  return {
    provider,
    status: "pass",
    score: 0.95 + Math.random() * 0.05,
    timestamp: Date.now(),
  };
}

export async function generateComplianceProof(
  transactionId: string,
  disclosedFields: DisclosureField[]
): Promise<ComplianceProof> {
  // Simulate ZK proof generation (~400ms)
  await sleep(350 + Math.random() * 100);

  const proof: ComplianceProof = {
    id: generateId(),
    transactionId,
    proofType: "groth16",
    curve: "bn254",
    proof: generateGroth16Proof(),
    publicInputs: [
      `0x${randomHex(32)}`, // commitment hash
      `0x${randomHex(32)}`, // nullifier hash
    ],
    attestations: {
      amlCheck: generateAttestation("Chainalysis"),
      sanctionsCheck: generateAttestation("Elliptic"),
      jurisdictionCheck: generateAttestation("VEIL Compliance Engine"),
    },
    disclosedFields,
    generatedAt: Date.now(),
    verifiedAt: null,
    isValid: true,
  };

  return proof;
}

export async function verifyComplianceProof(
  proof: ComplianceProof
): Promise<ComplianceProof> {
  // Simulate verification (~200ms)
  await sleep(150 + Math.random() * 100);

  return {
    ...proof,
    verifiedAt: Date.now(),
    isValid: true,
  };
}
