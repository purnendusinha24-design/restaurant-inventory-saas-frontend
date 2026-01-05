import PageHeader from "@/components/ui/PageHeader";

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventory"
        description="Manage ingredients and stock levels"
        action={
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
            + Add Ingredient
          </button>
        }
      />

      <div className="rounded-lg bg-slate-900 p-6">
        Inventory table goes here
      </div>
    </>
  );
}
