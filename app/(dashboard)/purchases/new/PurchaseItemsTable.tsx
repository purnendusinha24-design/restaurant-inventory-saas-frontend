import type { PurchaseItem } from "@/lib/api/purchase";

type Props = {
  items: PurchaseItem[];
  onRemove?: (index: number) => void;
};

export default function PurchaseItemsTable({ items, onRemove }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <table className="w-full mt-4 border rounded-md overflow-hidden">
      <thead className="bg-gray-600">
        <tr>
          <th className="p-2 text-left">Ingredient</th>
          <th className="p-2 text-center">Qty</th>
          <th className="p-2 text-center">Unit Price</th>
          <th className="p-2 text-center">Total</th>
          {onRemove && <th className="p-2 text-right">Action</th>}
        </tr>
      </thead>

      <tbody>
        {items.map((item, idx) => (
          <tr key={idx} className="border-t bg-gray-400">
            <td className="p-2">{item.ingredientName}</td>
            <td className="p-2 text-center">{item.quantity}</td>
            <td className="p-2 text-center">₹{item.unitPrice}</td>
            <td className="p-2 text-center">
              ₹{item.quantity * item.unitPrice}
            </td>

            {onRemove && (
              <td className="p-2 text-right">
                <button
                  className="text-red-600 text-sm hover:underline"
                  onClick={() => onRemove(idx)}
                >
                  Remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
