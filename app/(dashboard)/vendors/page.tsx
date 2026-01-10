"use client";

import { useState } from "react";
import { useVendors } from "@/app/hooks/useVendors";
import VendorsTable from "@/app/vendors/VendorsTable";
import VendorForm from "@/app/vendors/VendorForm";
import Button from "@/components/ui/Button";

export default function VendorsPage() {
  const { vendors, isLoading, refetch } = useVendors();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Vendors</h1>
        <Button onClick={() => setOpen(true)}>Add Vendor</Button>
      </div>

      <VendorsTable
        vendors={vendors}
        isLoading={isLoading}
        onChange={refetch}
      />

      <VendorForm
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
}
