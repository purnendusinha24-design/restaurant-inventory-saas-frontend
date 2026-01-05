import PageHeader from "@/components/ui/PageHeader";
import InventoryTable from "@/components/inventory/InventoryTable";

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventory"
        description="Track ingredient stock and availability"
        action={
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
            + Add Ingredient
          </button>
        }
      />

      <InventoryTable />
    </>
  );
}
