"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="rounded border border-red-800 bg-red-900/20 p-4 text-red-300">
      {error.message || "Failed to load reports"}
    </div>
  );
}
