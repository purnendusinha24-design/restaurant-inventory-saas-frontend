"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ConsumptionChart({
  data,
}: {
  data: { name: string; quantity: number; unit: string }[];
}) {
  return (
    <div className="h-75 rounded-lg text-blue-950 bg-slate-300 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "#8c8c8c" }} />
          <YAxis tick={{ fill: "#8c8c8c" }} />
          <Tooltip formatter={(v, _, p) => `${v} ${p.payload.unit}`} />
          <Bar dataKey="quantity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
