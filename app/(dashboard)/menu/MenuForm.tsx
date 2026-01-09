import { useForm, FormProvider } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { apiFetch } from "@/lib/api/client";
import RecipeEditor from "./RecipeEditor";

type MenuFormProps = {
  outletId: string;
  initialData?: any;
  onClose: () => void;
  onSaved: () => void;
};

export default function MenuForm({
  outletId,
  initialData,
  onClose,
  onSaved,
}: MenuFormProps) {
  const isEdit = Boolean(initialData);

  const methods = useForm({
    defaultValues: initialData ?? {
      name: "",
      price: "",
      category: "",
      recipe: [],
    },
  });

  const onSubmit = async (values: any) => {
    if (isEdit) {
      await apiFetch(`/menu/${initialData.id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
    } else {
      await apiFetch("/menu", {
        method: "POST",
        body: JSON.stringify({ ...values, outletId }),
      });
    }

    onSaved();
    onClose();
  };

  return (
    <Modal
      title={isEdit ? "Edit Menu Item" : "Add Menu Item"}
      onClose={onClose}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <input {...methods.register("name")} placeholder="Item name" />
          <input
            type="number"
            {...methods.register("price", { valueAsNumber: true })}
            placeholder="Price"
          />
          <input {...methods.register("category")} placeholder="Category" />

          {/* ✅ NO PROPS */}
          <RecipeEditor />

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
