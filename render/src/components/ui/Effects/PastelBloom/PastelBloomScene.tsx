import pastelBloomImg from "../../../../assets/images/pastel-bloom-bg.png";

export const PastelBloomScene = ({ hour }: { hour: number }) => {
  const getTimeConfig = (h: number) => {
    // 5h às 8h: Alvorecer (Tons mais frios e suaves)
    if (h >= 5 && h < 8)
      return {
        overlay: "bg-indigo-400/10",
        filter: "brightness(0.9) saturate(0.9) contrast(1.1)",
      };

    // 8h às 16h: Dia Pleno (Cores naturais da imagem)
    if (h >= 8 && h < 16)
      return {
        overlay: "bg-transparent",
        filter: "brightness(1.0) saturate(1.0)",
      };

    // 16h às 19h: Golden Hour (Realça o rosa e o pêssego)
    if (h >= 16 && h < 19)
      return {
        overlay: "bg-orange-300/15",
        filter: "brightness(1.05) saturate(1.2) sepia(0.1)",
      };

    // 19h às 5h: Noite (Transição para tons de "Luar")
    return {
      overlay: "bg-blue-900/30",
      filter: "brightness(0.6) saturate(0.7) contrast(1.2)",
    };
  };

  const config = getTimeConfig(hour);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden">
      {/* Imagem Base */}
      <img
        src={pastelBloomImg}
        alt="Pastel Bloom"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-4000 ease-in-out"
        style={{ filter: config.filter }}
      />

      {/* Camada de Cor Atmosférica */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-4000 ${config.overlay}`}
      />

      {/* Efeito de Bloom/Neblina sutil para o estilo Desktop */}
      <div className="absolute inset-0 bg-linear-to-t from-[#c8a2ff10] to-transparent pointer-events-none" />

      {/* Vinheta Suave */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_50%,rgba(20,20,40,0.3)_100%)] pointer-events-none" />
    </div>
  );
};
