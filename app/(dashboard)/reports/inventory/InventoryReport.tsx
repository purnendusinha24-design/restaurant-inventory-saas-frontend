import ConsumptionChart from "./ConsumptionChart";
import WastageTable from "./WastageTable";
import { useInventoryReport } from "../hooks/useInventoryReport";
import { useReportsFilters } from "../hooks/useReportsFilters";

export default function InventoryReport() {
  const { filters } = useReportsFilters();
  const { consumption, wastage, loading } = useInventoryReport(filters);

  if (loading) {
    return <div className="text-slate-400">Loading inventory…</div>;
  }

  return (
    <div className="space-y-6">
      <ConsumptionChart data={consumption} />
      <WastageTable items={wastage} />
    </div>
  );
}
