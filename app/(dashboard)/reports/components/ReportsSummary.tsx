"use client";

import { useSalesReport } from "../hooks/useSalesReport";
import type { ReportsFilters } from "../hooks/useReportsFilters";

type Props = {
  filters: ReportsFilters;
};

export default function ReportsSummary({ filters }: Props) {
  const { data, loading } = useSalesReport(filters);

  const cards = [
    { label: "Revenue", value: data?.revenue ?? 0 },
    { label: "Orders", value: data?.orders ?? 0 },
    { label: "Avg Order Value", value: data?.avgOrderValue ?? 0 },
    { label: "Wastage", value: 0 }, // wired later
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-lg bg-slate-900 p-4 text-slate-100"
        >
          <div className="text-sm text-slate-400">{c.label}</div>
          <div className="mt-1 text-2xl font-semibold">
            {loading ? "—" : `₹${c.value}`}
          </div>
        </div>
      ))}
    </div>
  );
}
