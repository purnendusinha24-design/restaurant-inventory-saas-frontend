"use client";

import { OrderListItem, cancelOrder } from "@/lib/api/orders";
import { useAuth } from "@/lib/use-auth";

type Props = {
  orders: OrderListItem[];
  onChange: () => void;
};

export default function OrdersTable({ orders, onChange }: Props) {
  const { user } = useAuth();

  if (orders.length === 0) {
    return (
      <div className="rounded border border-slate-800 p-6 text-slate-400">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded border border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-900 text-slate-300">
          <tr>
            <th className="px-4 py-2 text-left">Order #</th>
            <th className="px-4 py-2 text-center">Total</th>
            <th className="px-4 py-2 text-center">Status</th>
            <th className="px-4 py-2 text-center">Created</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr
              key={o.id}
              className="border-t border-slate-800 hover:bg-slate-900/40"
            >
              <td className="px-4 py-2 text-white">{o.orderNumber}</td>

              <td className="px-4 py-2 text-center">₹{o.total}</td>

              <td className="px-4 py-2 text-center">
                <span
                  className={`font-medium ${
                    o.status === "COMPLETED"
                      ? "text-green-400"
                      : o.status === "CANCELLED"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {o.status}
                </span>
              </td>

              <td className="px-4 py-2 text-center">
                {new Date(o.createdAt).toLocaleTimeString()}
              </td>

              <td className="px-4 py-2 text-center">
                {o.status === "COMPLETED" &&
                  (user?.role === "OWNER" || user?.role === "MANAGER") && (
                    <button
                      onClick={async () => {
                        await cancelOrder(o.id);
                        onChange();
                      }}
                      className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                    >
                      Cancel
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
