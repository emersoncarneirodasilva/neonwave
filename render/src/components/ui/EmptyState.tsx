interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-theme rounded-lg p-10 text-center">
      <h3 className="font-semibold mb-2">{title}</h3>

      {description && <p className="text-sm opacity-60 mb-4">{description}</p>}

      {action && <div>{action}</div>}
    </div>
  );
}
