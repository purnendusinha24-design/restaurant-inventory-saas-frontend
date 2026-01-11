export default function SkeletonPanel() {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900 p-5 animate-pulse">
      <div className="h-4 w-32 bg-slate-700 rounded mb-4" />

      <div className="space-y-3">
        <div className="h-2 w-full bg-slate-800 rounded" />
        <div className="h-2 w-5/6 bg-slate-800 rounded" />
        <div className="h-2 w-4/6 bg-slate-800 rounded" />
      </div>
    </div>
  );
}
