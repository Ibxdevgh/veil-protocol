"use client";

import { useState } from "react";
import { useApiKeys } from "@/hooks/useApiKeys";
import { formatDate, cn } from "@/lib/utils";
import {
  Plus,
  Key,
  Copy,
  Check,
  Trash2,
  Ban,
} from "lucide-react";

export default function ApiKeyManager() {
  const { keys, create, revoke, remove } = useApiKeys();
  const [newName, setNewName] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [justCreated, setJustCreated] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newName.trim()) return;
    const key = create(newName);
    setJustCreated(key.key);
    setNewName("");
    setShowNew(false);
  };

  const handleCopy = async (key: string, id: string) => {
    await navigator.clipboard.writeText(key);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne text-2xl font-bold tracking-tight">
            API Keys
          </h1>
          <p className="text-sm text-veil-text-secondary mt-1">
            Manage API keys for programmatic access to VEIL protocol.
          </p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-veil-green text-veil-bg font-jetbrains text-[0.78rem] font-semibold hover:shadow-[0_0_24px_rgba(16,185,129,0.3)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Generate Key
        </button>
      </div>

      {/* New key warning */}
      {justCreated && (
        <div className="glass-card p-4 border-veil-green/30 bg-veil-green-dim/30">
          <p className="font-jetbrains text-[0.78rem] text-veil-green font-semibold mb-2">
            Save this key now — it won&apos;t be shown again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-veil-bg px-3 py-2 rounded-veil-xs font-jetbrains text-[0.72rem] text-veil-text break-all">
              {justCreated}
            </code>
            <button
              onClick={() => handleCopy(justCreated, "new")}
              className="p-2 rounded-veil-xs hover:bg-veil-green-dim text-veil-green transition-all"
            >
              {copied === "new" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <button
            onClick={() => setJustCreated(null)}
            className="mt-2 font-jetbrains text-[0.7rem] text-veil-text-muted hover:text-veil-text-secondary transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Create form */}
      {showNew && (
        <div className="glass-card p-5 flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Key name (e.g., Production Bot)"
            className="flex-1 bg-veil-surface border border-veil-border rounded-veil-sm py-2.5 px-4 font-jetbrains text-sm text-veil-text placeholder:text-veil-text-muted focus:outline-none focus:border-veil-green transition-all"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <button
            onClick={handleCreate}
            disabled={!newName.trim()}
            className="px-5 py-2.5 rounded-full bg-veil-green text-veil-bg font-jetbrains text-[0.78rem] font-semibold disabled:opacity-40 transition-all"
          >
            Create
          </button>
        </div>
      )}

      {/* Key list */}
      {keys.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Key className="w-8 h-8 text-veil-text-muted mx-auto mb-3" />
          <p className="font-jetbrains text-sm text-veil-text-muted">
            No API keys yet. Generate one to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {keys.map((key) => (
            <div
              key={key.id}
              className={cn(
                "glass-card p-4 flex items-center justify-between",
                !key.isActive && "opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Key
                  className={cn(
                    "w-4 h-4",
                    key.isActive ? "text-veil-green" : "text-veil-text-muted"
                  )}
                />
                <div>
                  <div className="font-jetbrains text-sm font-semibold text-veil-text">
                    {key.name}
                  </div>
                  <div className="font-jetbrains text-[0.7rem] text-veil-text-muted">
                    {key.prefix} &middot; Created {formatDate(key.createdAt)}
                    {!key.isActive && (
                      <span className="text-red-400 ml-2">Revoked</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {key.isActive && (
                  <button
                    onClick={() => handleCopy(key.key, key.id)}
                    className="p-1.5 rounded-veil-xs hover:bg-veil-green-dim text-veil-text-muted hover:text-veil-green transition-all"
                    title="Copy key"
                  >
                    {copied === key.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
                {key.isActive && (
                  <button
                    onClick={() => revoke(key.id)}
                    className="p-1.5 rounded-veil-xs hover:bg-yellow-500/10 text-veil-text-muted hover:text-yellow-400 transition-all"
                    title="Revoke key"
                  >
                    <Ban className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => remove(key.id)}
                  className="p-1.5 rounded-veil-xs hover:bg-red-500/10 text-veil-text-muted hover:text-red-400 transition-all"
                  title="Delete key"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
