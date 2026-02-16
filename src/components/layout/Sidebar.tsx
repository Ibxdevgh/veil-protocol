"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Shield,
  History,
  Settings,
  Key,
  BarChart3,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/shield", label: "Shield", icon: Shield },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/api-keys", label: "API Keys", icon: Key },
  { href: "/metrics", label: "Metrics", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen border-r border-veil-border bg-veil-bg flex flex-col sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-veil-border">
        <Link href="/" className="flex items-center gap-1">
          <span className="font-jetbrains font-extrabold text-lg tracking-[0.18em] uppercase bg-gradient-to-br from-veil-green to-emerald-300 bg-clip-text text-transparent">
            VEIL
          </span>
          <span className="w-2 h-2 rounded-full bg-veil-green shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-veil-sm font-jetbrains text-[0.78rem] font-medium tracking-wide transition-all duration-200",
                isActive
                  ? "bg-veil-green-dim text-veil-green"
                  : "text-veil-text-muted hover:text-veil-text-secondary hover:bg-white/[0.03]"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-veil-border">
        <div className="font-jetbrains text-[0.62rem] text-veil-text-muted tracking-wider uppercase">
          VEIL Protocol v0.1.0
        </div>
      </div>
    </aside>
  );
}
