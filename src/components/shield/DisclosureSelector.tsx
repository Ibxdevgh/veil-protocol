"use client";

import { DisclosureField } from "@/types/transaction";
import { DISCLOSURE_FIELD_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const ALL_FIELDS: DisclosureField[] = [
  "sender",
  "recipient",
  "amount",
  "timestamp",
  "purpose",
  "jurisdiction",
  "compliance_status",
];

interface Props {
  selected: DisclosureField[];
  onChange: (fields: DisclosureField[]) => void;
}

export default function DisclosureSelector({ selected, onChange }: Props) {
  const toggle = (field: DisclosureField) => {
    if (selected.includes(field)) {
      onChange(selected.filter((f) => f !== field));
    } else {
      onChange([...selected, field]);
    }
  };

  return (
    <div>
      <label className="block font-jetbrains text-[0.72rem] font-medium text-veil-text-secondary uppercase tracking-wider mb-2">
        Selective Disclosure
      </label>
      <p className="text-[0.8rem] text-veil-text-muted mb-3">
        Choose which fields are visible in the compliance proof. Unchecked
        fields remain private.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {ALL_FIELDS.map((field) => {
          const isSelected = selected.includes(field);
          return (
            <button
              key={field}
              type="button"
              onClick={() => toggle(field)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-veil-sm border text-left transition-all duration-200",
                isSelected
                  ? "border-veil-green/30 bg-veil-green-dim text-veil-green"
                  : "border-veil-border bg-veil-surface text-veil-text-muted hover:border-veil-border-hover"
              )}
            >
              {isSelected ? (
                <Eye className="w-3.5 h-3.5 flex-shrink-0" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              <span className="font-jetbrains text-[0.72rem] font-medium">
                {DISCLOSURE_FIELD_LABELS[field]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
