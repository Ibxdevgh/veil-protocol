"use client";

import { useMemo } from "react";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { useApiKeys } from "@/hooks/useApiKeys";
import { cn } from "@/lib/utils";
import {
  Shield,
  CheckCircle2,
  XCircle,
  Key,
  Activity,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: typeof Shield;
  color: "green" | "violet" | "text";
  subtitle?: string;
}

function MetricCard({ label, value, icon: Icon, color, subtitle }: MetricCardProps) {
  const colorMap = {
    green: "text-veil-green",
    violet: "text-veil-violet",
    text: "text-veil-text",
  };
  const bgMap = {
    green: "bg-veil-green-dim",
    violet: "bg-veil-violet-dim",
    text: "bg-white/5",
  };

  return (
    <div className="glass-card glass-card-hover p-5">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={cn(
            "w-9 h-9 rounded-veil-sm flex items-center justify-center",
            bgMap[color]
          )}
        >
          <Icon className={cn("w-4 h-4", colorMap[color])} />
        </div>
        <span className="font-jetbrains text-[0.68rem] font-medium text-veil-text-muted uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div
        className={cn(
          "font-jetbrains text-2xl font-bold tracking-tight",
          colorMap[color]
        )}
      >
        {value}
      </div>
      {subtitle && (
        <p className="font-jetbrains text-[0.68rem] text-veil-text-muted mt-1 italic">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function MetricsDashboard() {
  const { transactions } = useTransactionHistory();
  const { keys } = useApiKeys();

  const metrics = useMemo(() => {
    const completed = transactions.filter((t) => t.status === "completed");
    const failed = transactions.filter((t) => t.status === "failed");
    const totalVolume = completed.reduce((sum, t) => sum + t.amount, 0);
    const avgAmount =
      completed.length > 0 ? totalVolume / completed.length : 0;
    const activeKeys = keys.filter((k) => k.isActive).length;
    const complianceRate =
      transactions.length > 0
        ? ((completed.length / transactions.length) * 100).toFixed(1)
        : "100.0";

    return {
      total: transactions.length,
      completed: completed.length,
      failed: failed.length,
      totalVolume: totalVolume.toFixed(4),
      avgAmount: avgAmount.toFixed(4),
      activeKeys,
      complianceRate,
    };
  }, [transactions, keys]);

  // Build simple bar chart data from last 7 days
  const chartData = useMemo(() => {
    const days = 7;
    const now = Date.now();
    const dayMs = 86400000;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const dayStart = now - i * dayMs;
      const dayEnd = dayStart + dayMs;
      const count = transactions.filter(
        (t) => t.timestamp >= dayStart && t.timestamp < dayEnd
      ).length;
      const label = new Date(dayStart).toLocaleDateString("en-US", {
        weekday: "short",
      });
      data.push({ label, count });
    }

    return data;
  }, [transactions]);

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold tracking-tight">
          Protocol Metrics
        </h1>
        <p className="text-sm text-veil-text-secondary mt-1">
          Real-time protocol activity from your local session.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Transactions"
          value={metrics.total}
          icon={Activity}
          color="green"
        />
        <MetricCard
          label="Shielded"
          value={metrics.completed}
          icon={Shield}
          color="green"
        />
        <MetricCard
          label="Failed"
          value={metrics.failed}
          icon={XCircle}
          color={metrics.failed > 0 ? "text" : "green"}
        />
        <MetricCard
          label="Compliance Rate"
          value={`${metrics.complianceRate}%`}
          icon={CheckCircle2}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MetricCard
          label="Total Volume"
          value={`${metrics.totalVolume} SOL`}
          icon={TrendingUp}
          color="violet"
        />
        <MetricCard
          label="Avg. Amount"
          value={`${metrics.avgAmount} SOL`}
          icon={Zap}
          color="violet"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MetricCard
          label="Active API Keys"
          value={metrics.activeKeys}
          icon={Key}
          color="text"
        />
        <MetricCard
          label="Proof Time"
          value="~400ms"
          icon={Clock}
          color="green"
          subtitle="Simulated Groth16"
        />
      </div>

      {/* Chart */}
      <div className="glass-card p-5">
        <h3 className="font-jetbrains text-[0.72rem] font-semibold text-veil-text-secondary uppercase tracking-wider mb-4">
          7-Day Activity
        </h3>
        <div className="flex items-end gap-3 h-32">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative" style={{ height: "100px" }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-veil-xs bg-gradient-to-t from-veil-green/40 to-veil-green/10 transition-all duration-500"
                  style={{
                    height: `${(d.count / maxCount) * 100}%`,
                    minHeight: d.count > 0 ? "4px" : "0px",
                  }}
                />
              </div>
              <span className="font-jetbrains text-[0.6rem] text-veil-text-muted">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
