import type { StatItem } from "@/types";

export function StatCard({ value, label }: StatItem) {
  return (
    <div className="stat-card">
      <div className="stat-num">{value}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}
