import RevenueChart from "./RevenueChart";
import TopItemsTable from "./TopItemsTable";

export default function SalesReport() {
  return (
    <div className="space-y-4">
      <RevenueChart />
      <TopItemsTable />
    </div>
  );
}
