"use client";

import { useState } from "react";
import { OrderListItem, cancelOrder } from "@/lib/api/orders";
import { useAuth } from "@/lib/use-auth";
import Button from "@/components/ui/Button";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import { buildWhatsAppOrderMessage } from "@/lib/whatsapp";

type Props = {
  orders: OrderListItem[];
  onChange: () => void;
};

export default function OrdersTable({ orders, onChange }: Props) {
  const { user } = useAuth();

  // ✅ Hooks MUST be inside the component
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="rounded border border-slate-800 p-6 text-slate-400">
        No orders found.
      </div>
    );
  }

  return (
    <>
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
                <td className="px-4 py-2 text-blue-950">{o.orderNumber}</td>

                <td className="px-4 py-2 text-center text-blue-950">
                  ₹{o.total}
                </td>

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

                <td className="px-4 py-2 text-center text-blue-950">
                  {new Date(o.createdAt).toLocaleTimeString()}
                </td>

                {/* ✅ Actions */}
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedOrderId(o.id)}
                    >
                      View
                    </Button>

                    {/* WhatsApp (disabled if no phone) */}
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={!o.customerPhone}
                      title={
                        o.customerPhone
                          ? "Send bill on WhatsApp"
                          : "Customer phone number not available"
                      }
                      onClick={() => {
                        if (!o.customerPhone) return;

                        const message = buildWhatsAppOrderMessage({
                          orderNumber: o.orderNumber,
                          total: o.total,
                        });

                        window.open(
                          `https://wa.me/${
                            o.customerPhone
                          }?text=${encodeURIComponent(message)}`,
                          "_blank"
                        );
                      }}
                    >
                      WhatsApp
                    </Button>

                    {o.status === "PENDING" &&
                      (user?.role === "OWNER" || user?.role === "MANAGER") && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={async () => {
                            await cancelOrder(o.id);
                            onChange();
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Drawer mounted once, controlled by state */}
      <OrderDetailsDrawer
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </>
  );
}
