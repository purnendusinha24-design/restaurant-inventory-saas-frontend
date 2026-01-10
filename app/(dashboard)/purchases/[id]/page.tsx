"use client";

import { useParams } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

import { usePurchase } from "../hooks/usePurchase";
import { useAddPurchaseItem } from "../hooks/useAddPurchaseItem";
import { useCompletePurchase } from "../hooks/useCompletePurchase";

import PurchaseItemForm from "../new/PurchaseItemForm";
import PurchaseItemsTable from "../new/PurchaseItemsTable";
import PurchaseSummary from "../new/PurchaseSummary";

import type { PurchaseItem } from "@/lib/api/purchase";

export default function PurchaseDetailPage() {
  const params = useParams();
  const purchaseId = params.id as string;

  const { purchase, loading, error, refetch } = usePurchase(purchaseId);
  const { addItem } = useAddPurchaseItem();
  const { completePurchase, loading: completing } = useCompletePurchase();

  /* =========================
     GUARDS
  ========================= */
  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!purchase) return <div className="text-red-600">Purchase not found</div>;

  /* =========================
     SAFE CONSTANTS (KEY FIX)
  ========================= */
  const purchaseIdSafe = purchase.id;

  const items: PurchaseItem[] = purchase.items.map((item) => ({
    ingredientId: item.ingredient.id,
    ingredientName: item.ingredient.name,
    unit: item.ingredient.unit,
    quantity: item.quantity,
    unitPrice: Number(item.unitCost),
  }));

  /* =========================
     ACTIONS
  ========================= */
  async function handleAddItem(item: PurchaseItem) {
    await addItem({
      purchaseId: purchaseIdSafe,
      ingredientId: item.ingredientId,
      quantity: item.quantity,
      unitCost: item.unitPrice,
    });

    await refetch();
  }

  async function handleComplete() {
    const ok = confirm(
      "Complete this purchase?\nThis will add stock to inventory."
    );
    if (!ok) return;

    await completePurchase(purchaseIdSafe);
    await refetch();
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Purchase Details"
        description={`Purchase ID: ${purchaseIdSafe}`}
      />

      {/* STATUS */}
      <div className="text-sm">
        Status:{" "}
        {purchase.status === "DRAFT" ? (
          <span className="text-orange-600 font-medium">Draft</span>
        ) : (
          <span className="text-green-600 font-medium">Completed</span>
        )}
      </div>

      {/* ADD ITEM — DRAFT ONLY */}
      {purchase.status === "DRAFT" && (
        <PurchaseItemForm onAdd={handleAddItem} />
      )}

      {/* ITEMS */}
      <PurchaseItemsTable items={items} />

      {/* SUMMARY */}
      <PurchaseSummary items={items} />

      {/* COMPLETE — DRAFT ONLY */}
      {purchase.status === "DRAFT" && (
        <Button onClick={handleComplete} disabled={completing}>
          {completing ? "Completing…" : "Complete Purchase"}
        </Button>
      )}
    </div>
  );
}
