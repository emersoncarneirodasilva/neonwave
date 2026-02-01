import { THEMES } from "../../constants/themes";
import { useTheme } from "../../hooks/useTheme";
import type { LucideIcon } from "lucide-react";

export function ThemesPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Temas</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {THEMES.map((item) => {
          const active = theme === item.id;
          const Icon = item.icon as LucideIcon;

          return (
            <button
              key={item.id}
              onClick={() => setTheme(item.id)}
              className={`
                flex items-center gap-3 rounded-lg border p-4 text-left transition
                ${
                  active
                    ? "border-(--primary) bg-(--hover-bg-strong)"
                    : "border-(--border) hover:bg-(--hover-bg)"
                }
              `}
            >
              <Icon
                size={18}
                className={active ? "text-(--primary)" : "opacity-60"}
              />

              <span
                className={
                  active ? "font-medium text-(--primary)" : "opacity-80"
                }
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
