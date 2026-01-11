"use client";

import { TopSellingItem } from "../hooks/useTopSellingItems";

export default function TopSellingItems({
  items,
  loading,
}: {
  items: TopSellingItem[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="rounded-lg bg-slate-900 p-4 text-slate-400">
        Loading top selling items…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg bg-slate-900 p-4 text-slate-400">
        No sales recorded for today
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-medium text-slate-300">
        Today’s Top Selling Items
      </h3>

      <table className="w-full text-sm">
        <thead className="text-slate-400">
          <tr className="border-b border-slate-800">
            <th className="py-2 text-left">Item</th>
            <th className="py-2 text-right">Qty Sold</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.menuId}
              className="border-b border-slate-800 last:border-0"
            >
              <td className="py-4 font-extrabold text-slate-200">
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                {item.name}
              </td>
              <td className="py-2 text-right font-medium text-slate-100">
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
