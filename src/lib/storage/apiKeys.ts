import { ApiKey } from "@/types/policy";
import { STORAGE_KEYS } from "@/lib/constants";
import { generateId } from "@/lib/utils";

function getStoredKeys(): ApiKey[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEYS.API_KEYS);
  return raw ? JSON.parse(raw) : [];
}

export function getApiKeys(): ApiKey[] {
  return getStoredKeys();
}

export function generateApiKey(name: string): ApiKey {
  const fullKey = `veil_${Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")}`;

  const key: ApiKey = {
    id: generateId(),
    name,
    prefix: fullKey.slice(0, 12) + "...",
    key: fullKey,
    createdAt: Date.now(),
    lastUsedAt: null,
    isActive: true,
  };

  const keys = getStoredKeys();
  keys.unshift(key);
  localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(keys));
  return key;
}

export function revokeApiKey(id: string): void {
  const keys = getStoredKeys().map((k) =>
    k.id === id ? { ...k, isActive: false } : k
  );
  localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(keys));
}

export function deleteApiKey(id: string): void {
  const keys = getStoredKeys().filter((k) => k.id !== id);
  localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(keys));
}
