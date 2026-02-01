import { useMemo } from "react";

export const FallingLeaves = ({ isNight }: { isNight: boolean }) => {
  const leaves = useMemo(() => {
    // Definição das paletas baseadas nas árvores da sua imagem
    const dayPalette = [
      { main: "#d35400", border: "#a04000" }, // Laranja forte
      { main: "#e67e22", border: "#d35400" }, // Laranja claro
      { main: "#f1c40f", border: "#f39c12" }, // Amarelo vibrante
      { main: "#e6b00f", border: "#c2950d" }, // Dourado outonal
    ];

    const nightPalette = [
      { main: "#2c1608", border: "#1a0b02" }, // Marrom escuro
      { main: "#3d1f0a", border: "#261406" }, // Marrom médio
      { main: "#1e1e1e", border: "#000000" }, // Silhueta quase preta
    ];

    return Array.from({ length: 14 }).map((_, i) => {
      const colorIndex = Math.floor(
        Math.random() * (isNight ? nightPalette.length : dayPalette.length),
      );

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${Math.random() * 10 + 15}s`,
        delay: `${Math.random() * 20}s`,
        size: `${Math.random() * 8 + 8}px`,
        rotation: `${Math.random() * 360}deg`,
        swingDuration: `${Math.random() * 2 + 3}s`,
        // Salvamos as cores no objeto da folha
        colors: isNight ? nightPalette[colorIndex] : dayPalette[colorIndex],
      };
    });
  }, [isNight]); // Recalcula as cores quando muda o período

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 11 }}
    >
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }

        @keyframes swing {
          0%, 100% { transform: translateX(-20px) rotate(-10deg); }
          50% { transform: translateX(20px) rotate(10deg); }
        }

        .leaf-container {
          position: absolute;
          top: -50px;
          animation: fall var(--fall-dur) linear infinite;
          animation-delay: var(--delay);
          will-change: transform;
        }

        .leaf-shape {
          width: var(--size);
          height: var(--size);
          background: var(--leaf-color);
          border-radius: 2px 50%;
          border: 1px solid var(--leaf-border);
          animation: swing var(--swing-dur) ease-in-out infinite;
          transition: background 2s ease-in-out;
        }
      `}</style>

      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf-container"
          style={
            {
              left: leaf.left,
              "--fall-dur": leaf.duration,
              "--delay": leaf.delay,
            } as any
          }
        >
          <div
            className="leaf-shape"
            style={
              {
                "--size": leaf.size,
                "--swing-dur": leaf.swingDuration,
                "--leaf-color": leaf.colors.main,
                "--leaf-border": leaf.colors.border,
                transform: `rotate(${leaf.rotation})`,
                opacity: isNight ? 0.6 : 0.8,
              } as any
            }
          />
        </div>
      ))}
    </div>
  );
};
