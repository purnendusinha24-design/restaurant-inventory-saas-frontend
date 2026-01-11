import SalesReport from "@/app/(dashboard)/reports/sales/SalesReport";
import InventoryReport from "@/app/(dashboard)/reports/inventory/InventoryReport";
import PurchasesReport from "@/app/(dashboard)/reports/purchases/PurchasesReport";

type Props = {
  activeTab: "sales" | "inventory" | "purchases";
  onChangeTab: (tab: Props["activeTab"]) => void;
};

export default function ReportsTabs({ activeTab, onChangeTab }: Props) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950">
      <div className="flex border-b border-slate-800">
        {["sales", "inventory", "purchases"].map((tab) => (
          <button
            key={tab}
            onClick={() => onChangeTab(tab as any)}
            className={`px-4 py-2 text-sm ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-white"
                : "text-slate-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === "sales" && <SalesReport />}
        {activeTab === "inventory" && <InventoryReport />}
        {activeTab === "purchases" && <PurchasesReport />}
      </div>
    </div>
  );
}
