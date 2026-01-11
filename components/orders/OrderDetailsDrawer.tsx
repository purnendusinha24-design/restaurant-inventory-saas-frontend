"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { apiFetch } from "@/lib/api/client";
import { buildWhatsAppOrderMessage } from "@/lib/whatsapp";

/**
 * Full order shape returned by /orders/:id
 * (separate from OrderListItem on purpose)
 */
type OrderDetails = {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  customerPhone?: string;
};

type Props = {
  orderId: string | null;
  onClose: () => void;
};

export default function OrderDetailsDrawer({ orderId, onClose }: Props) {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    setLoading(true);
    apiFetch<OrderDetails>(`/orders/${orderId}`)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-md bg-slate-950 text-slate-100 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <h2 className="text-lg font-semibold">
            {order ? `Order ${order.orderNumber}` : "Order"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-4 p-4">
          {loading || !order ? (
            <div className="text-sm text-slate-400">Loading order…</div>
          ) : (
            <>
              {/* Status */}
              <div>
                <div className="text-xs text-slate-400">Status</div>
                <div className="font-medium">{order.status}</div>
              </div>

              {/* Items */}
              <div>
                <div className="mb-2 text-xs text-slate-400">Items</div>
                <ul className="space-y-1 text-sm">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>
                        {item.quantity} × {item.name}
                      </span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total */}
              <div className="flex justify-between border-t border-slate-800 pt-2 font-semibold">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button size="sm" variant="ghost">
                  Print
                </Button>

                {order.customerPhone && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const message = buildWhatsAppOrderMessage({
                        orderNumber: order.orderNumber,
                        items: order.items,
                        total: order.total,
                      });

                      window.open(
                        `https://wa.me/${
                          order.customerPhone
                        }?text=${encodeURIComponent(message)}`,
                        "_blank"
                      );
                    }}
                  >
                    WhatsApp
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
