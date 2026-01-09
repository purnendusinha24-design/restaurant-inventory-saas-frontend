"use client";

import { useState } from "react";
import { useMenu } from "./useMenu";
import MenuTable from "./MenuTable";
import MenuForm from "./MenuForm";
import Button from "@/components/ui/Button";
import { useOutlet } from "@/lib/api/useOutlet";

export default function MenuPage() {
  const { outletId } = useOutlet();
  const { menu, isLoading, refresh } = useMenu(outletId);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Menu</h1>

        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          + Add Item
        </Button>
      </div>

      <MenuTable
        items={menu}
        loading={isLoading}
        onEdit={(item) => {
          setEditing(item);
          setOpen(true);
        }}
        onChange={refresh}
      />

      {open && (
        <MenuForm
          outletId={outletId}
          initialData={editing}
          onClose={() => setOpen(false)}
          onSaved={refresh}
        />
      )}
    </div>
  );
}
