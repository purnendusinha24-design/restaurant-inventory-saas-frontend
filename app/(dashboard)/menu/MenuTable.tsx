import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import { apiFetch } from "@/lib/api/client";
import type { MenuItem } from "./types";

type MenuTableProps = {
  outletId: string;
  items: MenuItem[];
  loading: boolean;
  onEdit: (item: MenuItem) => void;
  onChange: () => void;
};

export default function MenuTable({
  outletId,
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

  const toggleActive = async (id: string, isActive: boolean) => {
    await apiFetch(
      `/menu/outlets/${outletId}/items/${id}/${
        isActive ? "deactivate" : "activate"
      }`,
      { method: "POST" }
    );
    onChange();
  };

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-blue-900 text-left">Item</th>
            <th className="p-3 text-blue-900 text-left">Category</th>
            <th className="p-3 text-blue-900 text-left">Price</th>
            <th className="p-3 text-blue-900 text-left">Active</th>
            <th className="p-3 text-blue-900 text-right" />
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3 text-blue-900 font-medium">{item.name}</td>
              <td className="p-3 text-blue-900">{item.category || "—"}</td>
              <td className="p-3 text-blue-900">₹{item.price}</td>
              <td className="p-3">
                <Switch
                  checked={item.isActive}
                  onChange={() => toggleActive(item.id, item.isActive)}
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
