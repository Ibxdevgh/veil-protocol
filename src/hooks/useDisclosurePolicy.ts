"use client";

import { useState, useEffect, useCallback } from "react";
import { DisclosurePolicy } from "@/types/policy";
import { DisclosureField } from "@/types/transaction";
import { getPolicies, savePolicy, deletePolicy } from "@/lib/storage/policies";
import { generateId } from "@/lib/utils";

export function useDisclosurePolicy() {
  const [policies, setPolicies] = useState<DisclosurePolicy[]>([]);

  const refresh = useCallback(() => {
    setPolicies(getPolicies());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createPolicy = useCallback(
    (name: string, description: string, fields: DisclosureField[]) => {
      const policy: DisclosurePolicy = {
        id: generateId(),
        name,
        description,
        disclosedFields: fields,
        isPreset: false,
        createdAt: Date.now(),
      };
      savePolicy(policy);
      refresh();
      return policy;
    },
    [refresh]
  );

  const removePolicy = useCallback(
    (id: string) => {
      deletePolicy(id);
      refresh();
    },
    [refresh]
  );

  return { policies, createPolicy, removePolicy, refresh };
}
