"use client";

import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { usePurchases } from "@/app/(dashboard)/purchases/hooks/usePurchases";
import { useDeletePurchase } from "./hooks/useDeletePurchase";

export default function PurchasesPage() {
  const { purchases, loading, error, refetch } = usePurchases();
  const { deletePurchase } = useDeletePurchase();

  if (loading) return <div>Loading…</div>;
  if (error) return <div>{error}</div>;

  async function handleDelete(e: React.MouseEvent, purchaseId: string) {
    e.preventDefault();
    e.stopPropagation();

    const ok = confirm("Delete this draft purchase?");
    if (!ok) return;

    await deletePurchase(purchaseId);
    refetch(); // ✅ now works
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchases"
        description="Track supplier purchases and inventory stock-in"
        action={
          <Link href="/purchases/new">
            <Button>Add Purchase</Button>
          </Link>
        }
      />

      <div className="rounded-lg border divide-y">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="flex justify-between items-center px-4 py-3 text-sm bg-gray-600 hover:bg-gray-400"
          >
            {/* LEFT → clickable area */}
            <Link
              href={`/purchases/${purchase.id}`}
              className="flex-1 flex justify-between items-center pr-4"
            >
              <span>{purchase.vendor.name}</span>

              <div className="flex items-center gap-3">
                <span>₹{Number(purchase.totalCost).toFixed(2)}</span>

                {purchase.status === "DRAFT" ? (
                  <span className="text-xs text-orange-600">Draft</span>
                ) : (
                  <span className="text-xs text-green-600">Completed</span>
                )}
              </div>
            </Link>

            {/* RIGHT → delete button */}
            {purchase.status === "DRAFT" && (
              <button
                onClick={(e) => handleDelete(e, purchase.id)}
                className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
