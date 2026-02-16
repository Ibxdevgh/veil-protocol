import { ShieldedTransaction } from "@/types/transaction";
import { STORAGE_KEYS } from "@/lib/constants";

export function getTransactions(): ShieldedTransaction[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return raw ? JSON.parse(raw) : [];
}

export function saveTransaction(tx: ShieldedTransaction): void {
  const txs = getTransactions();
  const idx = txs.findIndex((t) => t.id === tx.id);
  if (idx >= 0) {
    txs[idx] = tx;
  } else {
    txs.unshift(tx);
  }
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txs));
}

export function getTransactionById(
  id: string
): ShieldedTransaction | undefined {
  return getTransactions().find((t) => t.id === id);
}

export function clearTransactions(): void {
  localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
}
