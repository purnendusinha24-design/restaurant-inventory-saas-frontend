export default function WastageTable({
  items,
}: {
  items: {
    name: string;
    quantity: number;
    unit: string;
    reason: string;
  }[];
}) {
  return (
    <div className="rounded-lg bg-slate-200 p-4">
      <table className="w-full text-sm">
        <thead className="text-slate-800">
          <tr>
            <th className="text-left py-2">Ingredient</th>
            <th className="text-right">Qty</th>
            <th className="text-left pl-4">Reason</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, idx) => (
            <tr key={idx} className="border-t border-slate-800">
              <td className="py-2">{i.name}</td>
              <td className="text-right">
                {i.quantity} {i.unit}
              </td>
              <td className="pl-4 text-slate-400">{i.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
