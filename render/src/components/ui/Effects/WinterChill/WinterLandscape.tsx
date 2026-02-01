import winterLandscapeImg from "../../../../assets/images/winter-landscape.png";

interface LandscapeProps {
  time: number;
}

export const WinterLandscape = ({ time }: LandscapeProps) => {
  const getFilters = () => {
    // 1. NOITE COM AURORA (Das 21h às 05h da manhã)
    // A aurora começa cedo e ilumina a noite toda.
    // Usamos 185deg para um Ciano/Azul Ártico que evita o vermelho.
    if (time >= 21 || time < 5) {
      return "brightness(0.28) contrast(1.3) saturate(1.2) hue-rotate(185deg)";
    }

    // 2. AMANHECER (05h às 09h)
    // Transição suave para a luz do dia
    if (time >= 5 && time < 9) {
      return "brightness(0.55) contrast(1.1) saturate(0.9) hue-rotate(190deg)";
    }

    // 3. DIA (09h às 17h)
    // Luz natural e clara
    if (time >= 9 && time < 17) {
      return "brightness(0.85) contrast(1.0) saturate(1.0) hue-rotate(0deg)";
    }

    // 4. ENTARDECER (17h às 21h)
    // Vai escurecendo suavemente e ficando azulado antes da aurora
    return "brightness(0.40) contrast(1.2) saturate(0.8) hue-rotate(220deg)";
  };

  return (
    <div className="absolute inset-0 z-9 flex items-center justify-center">
      <img
        src={winterLandscapeImg}
        alt="Winter Landscape"
        className="absolute object-contain pointer-events-none transition-all duration-10000 ease-in-out"
        style={{
          imageRendering: "pixelated",
          filter: getFilters(),
          width: "100%",
          height: "100%",
          transform: "scale(0.59) translateX(20%) translateY(-3%)",
          mixBlendMode: "lighten",
          // Adicionamos transição explícita para o filtro
          willChange: "filter",
        }}
      />
    </div>
  );
};
