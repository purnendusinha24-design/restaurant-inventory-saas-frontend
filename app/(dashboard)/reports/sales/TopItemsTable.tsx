"use client";

type TopItem = {
  name: string;
  quantity: number;
};

type Props = {
  data: TopItem[];
  loading: boolean;
};

export default function TopItemsTable({ data, loading }: Props) {
  if (loading) {
    return <div className="rounded bg-slate-900 p-4">Loading items...</div>;
  }

  if (data.length === 0) {
    return <div className="rounded bg-slate-900 p-4">No items</div>;
  }

  return (
    <div className="rounded bg-slate-900 p-4">
      {data.map((item) => (
        <div key={item.name} className="flex justify-between">
          <span>{item.name}</span>
          <span>{item.quantity}</span>
        </div>
      ))}
    </div>
  );
}
