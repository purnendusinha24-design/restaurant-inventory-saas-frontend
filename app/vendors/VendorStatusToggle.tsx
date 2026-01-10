import Button from "@/components/ui/Button";

export default function VendorStatusToggle({
  vendor,
}: {
  vendor: { isActive: boolean };
}) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        ${
          vendor.isActive ? "bg-black text-white" : "bg-gray-200 text-gray-700"
        }`}
    >
      {vendor.isActive ? "Active" : "Inactive"}
    </span>
  );
}
