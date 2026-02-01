import type { ReactNode } from "react";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <span className="uppercase text-xs opacity-50">{title}</span>
      <div className="mt-2 ml-2 flex flex-col gap-1">{children}</div>
    </div>
  );
}
