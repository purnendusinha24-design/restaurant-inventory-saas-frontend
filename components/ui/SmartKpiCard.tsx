"use client";

import React from "react";

type Status = "healthy" | "warning" | "critical";

interface SmartKpiCardProps {
  title: string;
  value: number | string;
  contextText: string;
  status: Status;
  ctaLabel: string;
  onClick: () => void;
}

const statusDot = {
  healthy: "bg-green-500",
  warning: "bg-yellow-400",
  critical: "bg-red-500",
};

export default function SmartKpiCard({
  title,
  value,
  contextText,
  status,
  ctaLabel,
  onClick,
}: SmartKpiCardProps) {
  return (
    <div
      onClick={onClick}
      className="
    cursor-pointer rounded-xl bg-slate-900 p-5
    border border-white/5
    shadow-[0_20px_50px_rgba(0,0,0,0.35)]
    transition-all duration-200
    hover:-translate-y-1
    hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]
  "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${statusDot[status]}`} />
      </div>

      {/* Value */}
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>

      {/* Context */}
      <p className="mt-1 text-sm text-slate-400">{contextText}</p>

      {/* CTA */}
      <p className="mt-4 text-sm text-blue-400">{ctaLabel} →</p>
    </div>
  );
}
