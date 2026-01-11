"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    date: string;
    revenue: number;
  }[];
  loading?: boolean;
};

export default function RevenueChart({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded bg-slate-900 text-slate-500">
        Loading chart…
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded bg-slate-900 text-slate-500">
        No sales data
      </div>
    );
  }

  return (
    <div className="h-64 rounded bg-slate-900 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #1e293b",
            }}
            labelStyle={{ color: "#e5e7eb" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
