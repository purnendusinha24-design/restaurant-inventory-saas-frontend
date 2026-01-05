type StatusBadgeProps = {
  status: "PENDING" | "COMPLETED" | "CANCELLED";
};

const styles = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  COMPLETED: "bg-green-500/10 text-green-400 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
