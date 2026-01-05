type StockStatus = "OK" | "LOW";

const styles: Record<StockStatus, string> = {
  OK: "bg-green-500/10 text-green-400 border-green-500/20",
  LOW: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function StockStatusBadge({ status }: { status: StockStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
