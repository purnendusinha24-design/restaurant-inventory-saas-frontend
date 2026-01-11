"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { apiFetch } from "@/lib/api/client";
import RecipeEditor from "./RecipeEditor";
import type { MenuFormValues } from "./types";

type MenuFormProps = {
  outletId: string;
  initialData?: Partial<MenuFormValues> & { id?: string };
  onClose: () => void;
  onSaved: () => void;
};

export default function MenuForm({
  outletId,
  initialData,
  onClose,
  onSaved,
}: MenuFormProps) {
  const isEdit = Boolean(initialData?.id);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, control } = useForm<MenuFormValues>({
    defaultValues: {
      name: initialData?.name ?? "",
      price: initialData?.price ?? "",
      category: initialData?.category ?? "",
      recipe: initialData?.recipe ?? [],
    },
  });

  const onSubmit = async (values: MenuFormValues) => {
    setError(null);
    setSaving(true);

    try {
      // 1️⃣ CREATE / UPDATE MENU ITEM
      const menuItem = await apiFetch<{ id: string }>(
        `/menu/outlets/${outletId}/items`,
        {
          method: isEdit ? "PUT" : "POST",
          body: JSON.stringify({
            name: values.name.trim(),
            price: Number(values.price), // 👈 convert here
            category: values.category || null,
          }),
        }
      );

      // 2️⃣ ADD INGREDIENTS
      for (const item of values.recipe) {
        if (!item.ingredientId || !item.quantity) continue;

        await apiFetch(`/menu/items/${menuItem.id}/ingredients`, {
          method: "POST",
          body: JSON.stringify({
            ingredientId: item.ingredientId,
            quantityRequired: item.quantity,
          }),
        });
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save menu item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Menu Item" : "Add Menu Item"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="Item name"
          className="input"
        />

        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
          className="input"
          min="0"
          step="0.01"
        />

        <input
          {...register("category")}
          placeholder="Category"
          className="input"
        />

        <RecipeEditor control={control} register={register} />

        {error && (
          <div className="rounded-md bg-red-900/40 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
