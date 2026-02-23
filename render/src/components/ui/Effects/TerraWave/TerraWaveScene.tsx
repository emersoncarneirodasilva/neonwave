import beachImg from "../../../../assets/images/beach-bg.png";

export const TerraWaveScene = ({ hour }: { hour: number }) => {
  const getStyle = () => {
    // 5h-7h: Amanhecer | 7h-16h: Dia | 16h-17h: Golden | 17h-18h: Crepúsculo | 19h-5h: Noite
    if (hour >= 5 && hour < 7) return { color: "#d1868055", brightness: "85%" };
    if (hour >= 7 && hour < 16)
      return { color: "transparent", brightness: "100%" };
    if (hour >= 16 && hour < 17)
      return { color: "#ca7d6c66", brightness: "90%" };
    if (hour >= 17 && hour < 19)
      return { color: "#4b2c2077", brightness: "65%" };
    return { color: "#1a1412aa", brightness: "50%" };
  };

  const { color, brightness } = getStyle();

  return (
    <div className="relative z-10 w-full h-full bg-transparent overflow-hidden">
      {/* IMAGEM DA PRAIA COM FILTRO DE BRILHO */}
      <img
        src={beachImg}
        className="w-full h-full object-cover transition-all duration-1000"
        style={{ filter: `brightness(${brightness})` }}
      />

      {/* OVERLAY DE COR */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          backgroundColor: color,
          mixBlendMode: "hard-light",
        }}
      />
    </div>
  );
};
