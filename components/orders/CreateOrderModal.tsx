"use client";

import { useEffect, useState } from "react";
import { createOrder } from "@/lib/api/orders";
import { fetchMenuItems } from "@/lib/api/menu";

type MenuItem = {
  id: string;
  name: string;
  price: string; // from API
};

type CartItem = {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  outletId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateOrderModal({
  outletId,
  onClose,
  onSuccess,
}: Props) {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --------------------------------------------------
  // Load menu
  // --------------------------------------------------
  useEffect(() => {
    fetchMenuItems(outletId).then(setMenu);
  }, [outletId]);

  // --------------------------------------------------
  // Add item to cart
  // --------------------------------------------------
  function addToCart() {
    if (!selectedMenuId) return;

    const menuItem = menu.find((m) => m.id === selectedMenuId);
    if (!menuItem) return;

    setCart((prev) => {
      const existing = prev.find((i) => i.menuId === menuItem.id);

      if (existing) {
        return prev.map((i) =>
          i.menuId === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [
        ...prev,
        {
          menuId: menuItem.id,
          name: menuItem.name,
          price: Number(menuItem.price),
          quantity: 1,
        },
      ];
    });

    setSelectedMenuId("");
  }

  // --------------------------------------------------
  // Update quantity
  // --------------------------------------------------
  function updateQty(menuId: string, quantity: number) {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.menuId !== menuId));
      return;
    }

    setCart((prev) =>
      prev.map((i) => (i.menuId === menuId ? { ...i, quantity } : i))
    );
  }

  // --------------------------------------------------
  // Submit order
  // --------------------------------------------------
  async function submit() {
    if (!cart.length) return;

    try {
      setLoading(true);
      setError(null);

      await createOrder({
        outletId,
        items: cart.map((i) => ({
          menuId: i.menuId,
          quantity: i.quantity,
        })),
      });

      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded bg-slate-900 p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-white">New Order</h2>

        {/* Menu selector */}
        <div className="mt-4 flex gap-2">
          <select
            className="flex-1 rounded bg-slate-800 px-3 py-2"
            value={selectedMenuId}
            onChange={(e) => setSelectedMenuId(e.target.value)}
          >
            <option value="">Select menu item</option>
            {menu.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — ₹{m.price}
              </option>
            ))}
          </select>

          <button
            onClick={addToCart}
            className="rounded bg-indigo-600 px-4 py-2 text-white"
          >
            Add
          </button>
        </div>

        {/* Cart */}
        {cart.length > 0 && (
          <div className="mt-4 space-y-2">
            {cart.map((item) => (
              <div
                key={item.menuId}
                className="flex items-center justify-between rounded bg-slate-800 px-3 py-2"
              >
                <div>
                  <p className="text-sm text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <input
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQty(item.menuId, Number(e.target.value))
                  }
                  className="w-16 rounded bg-slate-700 px-2 py-1 text-center"
                />
              </div>
            ))}
          </div>
        )}

        {/* Total */}
        <div className="mt-4 flex justify-between text-white">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-slate-300">
            Cancel
          </button>

          <button
            disabled={loading || !cart.length}
            onClick={submit}
            className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Creating…" : "Create Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
