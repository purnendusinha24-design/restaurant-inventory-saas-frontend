import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { apiFetch } from "@/lib/api/client";

type MenuTableProps = {
  items: any[];
  loading: boolean;
  onEdit: (item: any) => void;
  onChange: () => void;
};

export default function MenuTable({
  items,
  loading,
  onEdit,
  onChange,
}: MenuTableProps) {
  if (loading) return <div>Loading…</div>;

  if (!items.length) {
    return (
      <div className="border rounded-xl p-6 text-center text-gray-500">
        No menu items yet
      </div>
    );
  }

  const toggleAvailability = async (id: string) => {
    await apiFetch(`/menu/${id}/toggle`, {
      method: "PATCH",
    });
    onChange();
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3 font-medium">{item.name}</td>
              <td>{item.category || "—"}</td>
              <td>₹{item.price}</td>
              <td>
                <Switch
                  checked={item.isAvailable}
                  onChange={() => toggleAvailability(item.id)}
                />
              </td>
              <td className="text-right p-3">
                <Button size="sm" variant="ghost" onClick={() => onEdit(item)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
