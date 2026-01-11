"use client";

interface OrdersSnapshotProps {
  ordersToday: number;
}

function MiniBar({ height }: { height: number }) {
  return <div className="w-3 rounded-sm bg-blue-400/80" style={{ height }} />;
}

export default function OrdersSnapshotSection({
  ordersToday,
}: OrdersSnapshotProps) {
  // Temporary mock for last 7 days (replace later with API data)
  const last7Days = [2, 3, 4, 5, 6, 4, 3];

  return (
    <div className="rounded-xl bg-slate-900 p-5 border border-white/5">
      <h2 className="mb-4 text-sm font-medium text-slate-300">
        📊 Orders Snapshot
      </h2>

      {/* Today summary */}
      <div className="mb-4">
        <p className="text-3xl font-semibold text-white">{ordersToday}</p>
        <p className="text-sm text-slate-400">Orders today</p>
      </div>

      {/* Mini chart */}
      <div className="flex items-end gap-2 h-20">
        {last7Days.map((count, index) => (
          <MiniBar key={index} height={count * 10} />
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-400">Last 7 days trend</p>
    </div>
  );
}
