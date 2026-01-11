"use client";

interface InventoryHealthSectionProps {
  lowStockItems: number;
  totalIngredients: number;
}

function HealthBar({
  label,
  percentage,
  status,
}: {
  label: string;
  percentage: number;
  status: "healthy" | "warning" | "critical";
}) {
  const colors = {
    healthy: "bg-green-500",
    warning: "bg-yellow-400",
    critical: "bg-red-500",
  };

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span className="text-slate-400 capitalize">{status}</span>
      </div>

      <div className="h-2 w-full rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${colors[status]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function InventoryHealthSection({
  lowStockItems,
  totalIngredients,
}: InventoryHealthSectionProps) {
  const healthyPercentage =
    totalIngredients === 0
      ? 100
      : Math.max(
          0,
          Math.round(
            ((totalIngredients - lowStockItems) / totalIngredients) * 100
          )
        );

  const status =
    lowStockItems === 0
      ? "healthy"
      : lowStockItems < totalIngredients / 2
      ? "warning"
      : "critical";

  return (
    <div className="rounded-xl bg-slate-900 p-5 border border-white/5">
      <h2 className="mb-4 text-sm font-medium text-slate-300">
        📦 Inventory Health
      </h2>

      <div className="space-y-4">
        <HealthBar
          label="Overall Stock Health"
          percentage={healthyPercentage}
          status={status}
        />
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Based on minimum stock thresholds
      </p>
    </div>
  );
}
