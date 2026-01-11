"use client";

import AttentionAlert from "@/components/ui/AttentionAlert";
import { useRouter } from "next/navigation";

interface AttentionNeededProps {
  lowStockItems: number;
  pendingPurchases: number;
}

export default function AttentionNeededSection({
  lowStockItems,
  pendingPurchases,
}: AttentionNeededProps) {
  const router = useRouter();

  const alerts = [];

  if (lowStockItems > 0) {
    alerts.push({
      severity: "critical" as const,
      message: `${lowStockItems} ingredient(s) below minimum stock`,
      ctaLabel: "Fix",
      onClick: () => router.push("/inventory?filter=low"),
    });
  }

  if (pendingPurchases > 0) {
    alerts.push({
      severity: "warning" as const,
      message: `${pendingPurchases} purchase(s) pending approval`,
      ctaLabel: "Review",
      onClick: () => router.push("/purchases?status=pending"),
    });
  }

  if (alerts.length === 0) {
    return (
      <div className="mt-8 rounded-xl bg-slate-900 p-5 border border-white/5">
        <h2 className="mb-2 text-sm font-medium text-slate-300">
          ⚠️ Needs Your Attention
        </h2>
        <p className="text-sm text-slate-400">
          All good today 🎉 No issues need attention.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl bg-slate-900 p-5 border border-white/5">
      <h2 className="mb-4 text-sm font-medium text-slate-300">
        ⚠️ Needs Your Attention
      </h2>

      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <AttentionAlert key={index} {...alert} />
        ))}
      </div>
    </div>
  );
}
