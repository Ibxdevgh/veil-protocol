import { DisclosurePolicy, POLICY_PRESETS } from "@/types/policy";
import { STORAGE_KEYS } from "@/lib/constants";
import { generateId } from "@/lib/utils";

function getStoredPolicies(): DisclosurePolicy[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEYS.POLICIES);
  return raw ? JSON.parse(raw) : [];
}

export function getPolicies(): DisclosurePolicy[] {
  const stored = getStoredPolicies();
  if (stored.length === 0) {
    const defaults = POLICY_PRESETS.map((p) => ({
      ...p,
      id: generateId(),
      createdAt: Date.now(),
    }));
    localStorage.setItem(STORAGE_KEYS.POLICIES, JSON.stringify(defaults));
    return defaults;
  }
  return stored;
}

export function savePolicy(policy: DisclosurePolicy): void {
  const policies = getPolicies();
  const idx = policies.findIndex((p) => p.id === policy.id);
  if (idx >= 0) {
    policies[idx] = policy;
  } else {
    policies.push(policy);
  }
  localStorage.setItem(STORAGE_KEYS.POLICIES, JSON.stringify(policies));
}

export function deletePolicy(id: string): void {
  const policies = getPolicies().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.POLICIES, JSON.stringify(policies));
}
