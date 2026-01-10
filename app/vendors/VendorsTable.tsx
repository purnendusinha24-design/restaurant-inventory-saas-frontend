import VendorStatusToggle from "./VendorStatusToggle";
import DeleteVendorDialog from "./DeleteVendorDialog";

export default function VendorsTable({
  vendors,
  isLoading,
  onChange,
}: {
  vendors: any[];
  isLoading: boolean;
  onChange: () => void;
}) {
  if (isLoading) {
    return (
      <div className="text-sm text-black text-muted-foreground">
        Loading vendors...
      </div>
    );
  }

  if (!vendors.length) {
    return (
      <div className="text-sm text-black text-muted-foreground">
        No vendors found. Add your first vendor.
      </div>
    );
  }

  return (
    <div className="border-blue-700 rounded-md overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-blue-50">
          <tr>
            <th className="p-3 text-blue-900 text-left">Name</th>
            <th className="p-3 text-blue-900 text-left">Contact</th>
            <th className="p-3 text-blue-900 text-left">Status</th>
            <th className="p-3 text-blue-900 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="border-t">
              <td className="p-3 text-blue-900 font-medium">{vendor.name}</td>
              <td className="p-3 text-blue-900">{vendor.phone || "—"}</td>
              <td className="p-3 ">
                <VendorStatusToggle vendor={vendor} />
              </td>
              <td className="p-3 text-right">
                <DeleteVendorDialog vendor={vendor} onChange={onChange} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
