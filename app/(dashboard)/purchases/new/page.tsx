"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { useCreatePurchase } from "@/app/(dashboard)/purchases/hooks/useCreatePurchase";
import { useVendors } from "@/app/hooks/useVendors";

export default function NewPurchasePage() {
  const router = useRouter();
  const { vendors } = useVendors();
  const { createPurchase, loading, error } = useCreatePurchase();

  const [vendorId, setVendorId] = useState("");

  async function handleCreatePurchase() {
    console.log("👉 Create Purchase clicked");
    console.log("Vendor ID:", vendorId);

    if (!vendorId) {
      alert("Please select a vendor");
      return;
    }

    const purchase = await createPurchase({ vendorId });

    console.log("Purchase response:", purchase);

    if (purchase?.id) {
      router.push(`/purchases/${purchase.id}`);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl text-blue-900">
      <PageHeader
        title="New Purchase"
        description="Create a purchase and then add items"
      />

      {/* Vendor */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Vendor</label>
        <select
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Select vendor</option>
          {vendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button onClick={handleCreatePurchase} disabled={!vendorId || loading}>
        {loading ? "Creating…" : "Create Purchase"}
      </Button>
    </div>
  );
}
