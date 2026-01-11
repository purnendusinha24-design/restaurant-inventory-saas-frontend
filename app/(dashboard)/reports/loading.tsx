export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-40 bg-slate-800 rounded" />
      <div className="h-20 bg-slate-900 rounded" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-slate-900 rounded" />
        ))}
      </div>
    </div>
  );
}
