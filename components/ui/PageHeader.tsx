type PageHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
