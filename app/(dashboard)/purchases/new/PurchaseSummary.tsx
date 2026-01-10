"use client";

import type { PurchaseItem } from "@/lib/api/purchase";

type Props = {
  items: PurchaseItem[];
};

export default function PurchaseSummary({ items }: Props) {
  const totalItems = items.length;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="rounded-lg border bg-gray-50 p-4 space-y-2 text-sm text-blue-900">
      <h3 className="font-medium text-base">Purchase Summary</h3>

      <div className="flex justify-between">
        <span>Total items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between">
        <span>Total quantity</span>
        <span>{totalQuantity}</span>
      </div>

      <div className="border-t pt-2 flex justify-between font-medium">
        <span>Subtotal</span>
        <span>₹ {subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
