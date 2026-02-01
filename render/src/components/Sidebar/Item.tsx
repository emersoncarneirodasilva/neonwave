import { NavLink } from "react-router-dom";

export function Item({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-2 py-1 rounded transition ${
          isActive
            ? "bg-(--navlink-bg-active) font-medium"
            : "opacity-70 hover:opacity-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
