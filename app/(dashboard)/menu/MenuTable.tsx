import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { apiFetch } from "@/lib/api/client";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  category?: string;
  isAvailable: boolean;
};

type MenuTableProps = {
  items: MenuItem[];
  loading: boolean;
  onEdit: (item: MenuItem) => void;
  onChange: () => void;
};

export default function MenuTable({
  items,
  loading,
  onEdit,
  onChange,
}: MenuTableProps) {
  if (loading) {
    return <div className="text-gray-500">Loading menu…</div>;
  }

  if (!items.length) {
    return (
      <div className="border rounded-xl p-6 text-center text-gray-500">
        No menu items yet
      </div>
    );
  }

  const toggleAvailability = async (id: string) => {
    await apiFetch(`/menu/${id}/toggle`, { method: "PATCH" });
    onChange();
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Item</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Available</th>
            <th className="p-3 text-right" />
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3 font-medium">{item.name}</td>
              <td className="p-3">{item.category || "—"}</td>
              <td className="p-3">₹{item.price}</td>
              <td className="p-3">
                <Switch
                  checked={item.isAvailable}
                  onChange={() => toggleAvailability(item.id)}
                />
              </td>
              <td className="p-3 text-right">
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
