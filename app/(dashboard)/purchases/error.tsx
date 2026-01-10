"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-sm text-red-600">
      Failed to load purchases: {error.message}
    </div>
  );
}
