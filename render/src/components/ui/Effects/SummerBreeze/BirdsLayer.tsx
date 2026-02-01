export const BirdsLayer: React.FC<{ time: number }> = ({ time }) => {
  const isNight = time >= 19 || time < 5.5;
  const isSunset = time >= 17 && time < 19;

  // Cor: No pôr do sol fica escuro contra a luz, de dia branco, à noite some.
  const birdColor = isSunset
    ? "#2d1b10"
    : isNight
      ? "transparent"
      : "rgba(255,255,255,0.8)";

  // Definição da formação em V (x e y são offsets relativos ao líder)
  const formation = [
    { x: 0, y: 0 }, // Líder (ponta do V)
    { x: -20, y: -15 }, // Asa esquerda 1
    { x: -40, y: -30 }, // Asa esquerda 2
    { x: -20, y: 15 }, // Asa direita 1
    { x: -40, y: 30 }, // Asa direita 2
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      <style>{`
        @keyframes fly-formation {
          from { transform: translate(-20vw, 20vh); }
          to { transform: translate(120vw, -10vh); }
        }
        @keyframes flap {
          0%, 100% { transform: scaleY(1) rotate(0deg); }
          50% { transform: scaleY(0.5) rotate(10deg); }
        }
        .v-formation {
          position: absolute;
          animation: fly-formation 45s linear infinite; /* Bem lento e calmo */
        }
        .bird-pixel {
          position: absolute;
          display: flex;
          gap: 1px;
          animation: flap 0.6s ease-in-out infinite;
        }
        /* Desenho da asa em pixel art simples */
        .wing {
          width: 6px;
          height: 2px;
          background: ${birdColor};
          border-radius: 1px;
        }
        .wing-left { transform: rotate(-20deg); }
        .wing-right { transform: rotate(20deg); }
      `}</style>

      {/* Grupo da Formação */}
      <div className="v-formation" style={{ top: "25%" }}>
        {formation.map((pos, i) => (
          <div
            key={i}
            className="bird-pixel"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              animationDelay: `${i * 0.1}s`, // Delay para o bater de asas não ser robótico
            }}
          >
            <div className="wing wing-left" />
            <div className="wing wing-right" />
          </div>
        ))}
      </div>
    </div>
  );
};
