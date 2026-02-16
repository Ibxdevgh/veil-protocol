"use client";

import { useState, useEffect, useCallback } from "react";
import { ShieldedTransaction } from "@/types/transaction";
import { ComplianceProof } from "@/types/proof";
import { getTransactions } from "@/lib/storage/transactions";

export function useTransactionHistory() {
  const [transactions, setTransactions] = useState<ShieldedTransaction[]>([]);

  const refresh = useCallback(() => {
    setTransactions(getTransactions());
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 3000);
    return () => clearInterval(interval);
  }, [refresh]);

  const getProof = useCallback((proofId: string): ComplianceProof | null => {
    if (typeof window === "undefined") return null;
    const proofs = JSON.parse(localStorage.getItem("veil_proofs") || "{}");
    return proofs[proofId] || null;
  }, []);

  return { transactions, refresh, getProof };
}
