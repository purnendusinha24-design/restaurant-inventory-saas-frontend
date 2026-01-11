"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { apiFetch } from "@/lib/api/client";
import RecipeEditor from "./RecipeEditor";
import type { MenuFormValues, MenuItem } from "./types";

type MenuFormProps = {
  outletId: string;
  initialData?: MenuItem;
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

  const { register, handleSubmit, control, reset } = useForm<MenuFormValues>({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      recipe: [],
    },
  });

  useEffect(() => {
    if (!initialData) return;

    reset({
      name: initialData.name,
      price: initialData.price.toString(),
      category: initialData.category ?? "",
      recipe: initialData.ingredients.map((i) => ({
        ingredientId: i.ingredientId,
        quantity: i.quantityRequired.toString(),
      })),
    });
  }, [initialData, reset]);

  const onSubmit = async (values: MenuFormValues) => {
    setError(null);
    setSaving(true);

    try {
      await apiFetch(
        isEdit
          ? `/menu/outlets/${outletId}/items/${initialData!.id}`
          : `/menu/outlets/${outletId}/items`,
        {
          method: isEdit ? "PUT" : "POST",
          body: JSON.stringify({
            name: values.name.trim(),
            price: Number(values.price),
            category: values.category || null,
            ingredients: values.recipe.map((r) => ({
              ingredientId: r.ingredientId,
              quantityRequired: Number(r.quantity),
            })),
          }),
        }
      );

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
        <input {...register("name", { required: true })} className="input" />
        <input
          type="number"
          {...register("price", { required: true })}
          className="input"
        />
        <input {...register("category")} className="input" />

        <RecipeEditor control={control} register={register} />

        {error && (
          <div className="text-sm text-red-400 bg-red-900/40 p-2 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="button" onClick={onClose}>
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
