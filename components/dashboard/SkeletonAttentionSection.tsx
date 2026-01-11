export default function SkeletonAttentionSection() {
  return (
    <div className="mt-8 rounded-xl border border-white/5 bg-slate-900 p-5 animate-pulse">
      <div className="h-4 w-40 bg-slate-700 rounded mb-4" />

      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-10 rounded bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
