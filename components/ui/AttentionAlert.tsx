"use client";

type Severity = "critical" | "warning" | "info";

interface AttentionAlertProps {
  message: string;
  severity: Severity;
  ctaLabel: string;
  onClick: () => void;
}

const severityStyles = {
  critical: "border-red-500/40 bg-red-500/10 text-red-300",
  warning: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
  info: "border-blue-500/40 bg-blue-500/10 text-blue-300",
};

export default function AttentionAlert({
  message,
  severity,
  ctaLabel,
  onClick,
}: AttentionAlertProps) {
  return (
    <div
      className={`
        flex items-center justify-between
        rounded-lg border p-4
        ${severityStyles[severity]}
      `}
    >
      <p className="text-sm">{message}</p>
      <button
        onClick={onClick}
        className="text-sm font-medium underline hover:opacity-80"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
