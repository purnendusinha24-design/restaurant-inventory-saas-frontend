import PageHeader from "@/components/ui/PageHeader";
import OrdersTable from "@/components/orders/OrdersTable";

export default function OrdersPage() {
  return (
    <>
      <PageHeader
        title="Orders"
        description="Track and manage customer orders"
      />

      <OrdersTable />
    </>
  );
}
