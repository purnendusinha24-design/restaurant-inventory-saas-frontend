import StatusBadge from "@/components/ui/StatusBadge";

type Order = {
  id: string;
  date: string;
  items: number;
  total: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
};

const mockOrders: Order[] = [
  {
    id: "ORD-1024",
    date: "05 Jan 2026",
    items: 5,
    total: "₹1,240",
    status: "COMPLETED",
  },
  {
    id: "ORD-1025",
    date: "05 Jan 2026",
    items: 2,
    total: "₹540",
    status: "PENDING",
  },
  {
    id: "ORD-1026",
    date: "04 Jan 2026",
    items: 3,
    total: "₹780",
    status: "CANCELLED",
  },
];

export default function OrdersTable() {
  if (mockOrders.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-center text-slate-400">
        No orders yet
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-900">
          <tr className="border-b border-slate-800 text-left text-slate-400">
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {mockOrders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/40 transition"
            >
              <td className="px-4 py-3 font-medium text-white">{order.id}</td>
              <td className="px-4 py-3 text-slate-300">{order.date}</td>
              <td className="px-4 py-3 text-slate-300">{order.items}</td>
              <td className="px-4 py-3 text-slate-300">{order.total}</td>
              <td className="px-4 py-3">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
