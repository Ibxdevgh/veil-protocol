"use client";

import { useState } from "react";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import TransactionTable from "@/components/history/TransactionTable";
import ProofDetailModal from "@/components/history/ProofDetailModal";
import { ComplianceProof } from "@/types/proof";

export default function HistoryPage() {
  const { transactions, getProof } = useTransactionHistory();
  const [selectedProof, setSelectedProof] = useState<ComplianceProof | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewProof = (_txId: string, proofId: string) => {
    const proof = getProof(proofId);
    if (proof) {
      setSelectedProof(proof);
      setModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold tracking-tight">
          Transaction History
        </h1>
        <p className="text-sm text-veil-text-secondary mt-1">
          View all shielded transfers and their compliance proofs.
        </p>
      </div>

      <TransactionTable
        transactions={transactions}
        onViewProof={handleViewProof}
      />

      <ProofDetailModal
        proof={selectedProof}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProof(null);
        }}
      />
    </div>
  );
}
