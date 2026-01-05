type StatCardProps = {
  title: string;
  value: string | number;
  helper?: string;
};

export default function StatCard({ title, value, helper }: StatCardProps) {
  return (
    <div className="rounded-lg bg-slate-900 border border-slate-800 p-5">
      <p className="text-sm text-slate-400">{title}</p>

      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold">{value}</span>
      </div>

      {helper && <p className="mt-2 text-xs text-slate-500">{helper}</p>}
    </div>
  );
}
