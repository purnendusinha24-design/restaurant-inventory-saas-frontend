import { KitchenOrder } from "@/lib/api/orders";

type Props = {
  order: KitchenOrder;
  onPreparing: () => void;
  onReady: () => void;
};

export default function KitchenOrderCard({
  order,
  onPreparing,
  onReady,
}: Props) {
  return (
    <div className="rounded-lg bg-slate-900 p-4 shadow">
      <div className="mb-2 flex justify-between">
        <h3 className="text-lg font-bold text-white">{order.orderNumber}</h3>
        <span className="text-sm text-slate-400">{order.status}</span>
      </div>

      <ul className="mb-4 text-sm text-slate-300">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.quantity} × {item.name}
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        {order.status === "PENDING" && (
          <button
            onClick={onPreparing}
            className="rounded bg-yellow-600 px-3 py-1 text-sm text-white"
          >
            Start Preparing
          </button>
        )}

        {order.status === "PREPARING" && (
          <button
            onClick={onReady}
            className="rounded bg-green-600 px-3 py-1 text-sm text-white"
          >
            Mark Ready
          </button>
        )}
      </div>
    </div>
  );
}
