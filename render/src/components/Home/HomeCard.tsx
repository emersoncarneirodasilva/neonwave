export default function HomeCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-theme p-4 bg-white/5">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
