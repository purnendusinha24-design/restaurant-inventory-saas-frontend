"use client";

import { useState } from "react";
import { useMenu } from "./useMenu";
import MenuTable from "./MenuTable";
import MenuForm from "./MenuForm";
import Button from "@/components/ui/Button";
import { useOutlet } from "@/lib/outlet-context";
import type { MenuItem } from "./types";

export default function MenuPage() {
  const { activeOutlet } = useOutlet();
  const outletId = activeOutlet?.id;

  const { menu, isLoading, refresh } = useMenu(outletId);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);

  if (!outletId) {
    return (
      <div className="p-6 text-gray-500">
        Please select an outlet to manage menu.
      </div>
    );
  }

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
        outletId={outletId}
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
          initialData={editing ?? undefined}
          onClose={() => setOpen(false)}
          onSaved={() => {
            refresh();
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
