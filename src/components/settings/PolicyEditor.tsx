"use client";

import { useState } from "react";
import { DisclosurePolicy } from "@/types/policy";
import { DisclosureField } from "@/types/transaction";
import { DISCLOSURE_FIELD_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useDisclosurePolicy } from "@/hooks/useDisclosurePolicy";
import {
  Plus,
  Trash2,
  Shield,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ALL_FIELDS: DisclosureField[] = [
  "sender",
  "recipient",
  "amount",
  "timestamp",
  "purpose",
  "jurisdiction",
  "compliance_status",
];

export default function PolicyEditor() {
  const { policies, createPolicy, removePolicy } = useDisclosurePolicy();
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<DisclosureField[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleField = (field: DisclosureField) => {
    setFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    createPolicy(name, description, fields);
    setName("");
    setDescription("");
    setFields([]);
    setShowCreate(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne text-2xl font-bold tracking-tight">
            Disclosure Policies
          </h1>
          <p className="text-sm text-veil-text-secondary mt-1">
            Configure what data is revealed in compliance proofs.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-veil-green text-veil-bg font-jetbrains text-[0.78rem] font-semibold hover:shadow-[0_0_24px_rgba(16,185,129,0.3)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          New Policy
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="glass-card p-5 space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Policy name"
            className="w-full bg-veil-surface border border-veil-border rounded-veil-sm py-2.5 px-4 font-jetbrains text-sm text-veil-text placeholder:text-veil-text-muted focus:outline-none focus:border-veil-green transition-all"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full bg-veil-surface border border-veil-border rounded-veil-sm py-2.5 px-4 text-sm text-veil-text placeholder:text-veil-text-muted focus:outline-none focus:border-veil-green transition-all"
          />
          <div className="grid grid-cols-2 gap-2">
            {ALL_FIELDS.map((field) => {
              const sel = fields.includes(field);
              return (
                <button
                  key={field}
                  type="button"
                  onClick={() => toggleField(field)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-veil-xs border text-left transition-all text-[0.72rem] font-jetbrains font-medium",
                    sel
                      ? "border-veil-green/30 bg-veil-green-dim text-veil-green"
                      : "border-veil-border bg-veil-surface text-veil-text-muted"
                  )}
                >
                  {sel ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {DISCLOSURE_FIELD_LABELS[field]}
                </button>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={!name.trim()}
              className="px-5 py-2 rounded-full bg-veil-green text-veil-bg font-jetbrains text-[0.78rem] font-semibold disabled:opacity-40 transition-all"
            >
              Create Policy
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="px-5 py-2 rounded-full border border-veil-border text-veil-text-secondary font-jetbrains text-[0.78rem] font-medium hover:border-veil-border-hover transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Policy list */}
      <div className="space-y-3">
        {policies.map((policy: DisclosurePolicy) => (
          <div key={policy.id} className="glass-card glass-card-hover">
            <button
              onClick={() =>
                setExpanded(expanded === policy.id ? null : policy.id)
              }
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-veil-green" />
                <div className="text-left">
                  <div className="font-jetbrains text-sm font-semibold text-veil-text">
                    {policy.name}
                  </div>
                  <div className="text-[0.75rem] text-veil-text-muted">
                    {policy.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {policy.isPreset && (
                  <span className="px-2 py-0.5 rounded-full bg-veil-violet-dim text-veil-violet font-jetbrains text-[0.62rem] font-semibold uppercase">
                    Preset
                  </span>
                )}
                {expanded === policy.id ? (
                  <ChevronUp className="w-4 h-4 text-veil-text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-veil-text-muted" />
                )}
              </div>
            </button>

            {expanded === policy.id && (
              <div className="px-4 pb-4 border-t border-veil-border pt-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {policy.disclosedFields.map((field) => (
                    <span
                      key={field}
                      className="px-2 py-1 rounded-full bg-veil-green-dim text-veil-green font-jetbrains text-[0.68rem] font-medium"
                    >
                      {DISCLOSURE_FIELD_LABELS[field] || field}
                    </span>
                  ))}
                </div>
                {!policy.isPreset && (
                  <button
                    onClick={() => removePolicy(policy.id)}
                    className="flex items-center gap-1.5 text-red-400 font-jetbrains text-[0.72rem] hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
