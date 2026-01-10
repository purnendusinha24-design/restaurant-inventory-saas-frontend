import Button from "@/components/ui/Button";
import { apiFetch } from "@/lib/api/client";

export default function DeleteVendorDialog({
  vendor,
  onChange,
}: {
  vendor: { id: string; isActive: boolean };
  onChange: () => void;
}) {
  async function toggleVendor() {
    await apiFetch(`/vendors/${vendor.id}/toggle`, {
      method: "PATCH",
    });

    onChange();
  }

  return (
    <Button
      size="sm"
      variant={vendor.isActive ? "destructive" : "primary"}
      onClick={toggleVendor}
    >
      {vendor.isActive ? "Deactivate" : "Activate"}
    </Button>
  );
}
