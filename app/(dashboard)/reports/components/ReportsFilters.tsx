"use client";

import { ReportsFilters as FiltersType } from "../hooks/useReportsFilters";

type Outlet = {
  id: string;
  name: string;
};

type Props = {
  filters: FiltersType;
  outlets: Outlet[];
  loadingOutlets: boolean;
  onChange: (next: Partial<FiltersType>) => void;
};

export default function ReportsFilters({
  filters,
  outlets,
  loadingOutlets,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-800 bg-slate-950 p-4">
      {/* Date Range */}
      <div>
        <div className="mb-1 text-xs text-slate-400">Date Range</div>
        <select
          value={filters.range}
          onChange={(e) =>
            onChange({ range: e.target.value as FiltersType["range"] })
          }
          className="rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7">Last 7 days</option>
          <option value="last30">Last 30 days</option>
          <option value="thisMonth">This month</option>
        </select>
      </div>

      {/* Outlet */}
      <div>
        <div className="mb-1 text-xs text-slate-400">Outlet</div>
        <select
          value={filters.outletId ?? "all"}
          onChange={(e) =>
            onChange({
              outletId: e.target.value === "all" ? null : e.target.value,
            })
          }
          className="rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
        >
          <option value="all">All outlets</option>

          {loadingOutlets ? (
            <option disabled>Loading outlets…</option>
          ) : (
            outlets.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}
