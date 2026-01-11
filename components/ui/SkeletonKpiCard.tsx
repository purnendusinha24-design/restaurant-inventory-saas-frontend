export default function SkeletonKpiCard() {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900 p-4 animate-pulse">
      <div className="h-4 w-24 rounded bg-slate-700 mb-3" />
      <div className="h-8 w-16 rounded bg-slate-600 mb-4" />
      <div className="h-3 w-32 rounded bg-slate-700" />
    </div>
  );
}
