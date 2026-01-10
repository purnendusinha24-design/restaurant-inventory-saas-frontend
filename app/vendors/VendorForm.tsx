"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { apiFetch } from "@/lib/api/client";

type VendorFormValues = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

export default function VendorForm({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<VendorFormValues>();

  if (!open) return null;

  async function onSubmit(values: VendorFormValues) {
    try {
      const payload = {
        name: values.name.trim(),
        ...(values.phone && { phone: values.phone }),
        ...(values.email && { email: values.email }),
        ...(values.address && { address: values.address }),
      };

      await apiFetch("/vendors", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      reset();
      onClose();
      onSuccess();
    } catch (err: any) {
      alert(err.message || "Failed to create vendor");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-md w-full max-w-md p-6 space-y-4"
      >
        <h2 className="text-lg text-black font-semibold">Add Vendor</h2>

        <Input
          {...register("name", { required: true })}
          placeholder="Vendor name"
        />

        <Input {...register("phone")} placeholder="Phone" />
        <Input {...register("email")} placeholder="Email" />
        <Input {...register("address")} placeholder="Address" />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
