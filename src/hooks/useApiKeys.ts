"use client";

import { useState, useEffect, useCallback } from "react";
import { ApiKey } from "@/types/policy";
import {
  getApiKeys,
  generateApiKey,
  revokeApiKey,
  deleteApiKey,
} from "@/lib/storage/apiKeys";

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);

  const refresh = useCallback(() => {
    setKeys(getApiKeys());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = useCallback(
    (name: string): ApiKey => {
      const key = generateApiKey(name);
      refresh();
      return key;
    },
    [refresh]
  );

  const revoke = useCallback(
    (id: string) => {
      revokeApiKey(id);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      deleteApiKey(id);
      refresh();
    },
    [refresh]
  );

  return { keys, create, revoke, remove, refresh };
}
