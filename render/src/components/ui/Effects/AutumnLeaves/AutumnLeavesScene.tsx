import autumnLightImg from "../../../../assets/images/autumn-bg-light.png";
import autumnDarkImg from "../../../../assets/images/autumn-bg-dark.png";

export const AutumnLeavesScene = ({ hour }: { hour: number }) => {
  const getTimeConfig = (h: number) => {
    // 5-6: Alvorecer (Transição suave)
    if (h >= 5 && h < 6)
      return {
        overlay: "bg-blue-900/20",
        brightness: "brightness-[0.9]",
        isNight: true,
      };
    // 6-9: Manhã Cedo
    if (h >= 6 && h < 9)
      return {
        overlay: "bg-orange-200/10",
        brightness: "brightness-[1.0]",
        isNight: false,
      };
    // 9-12: Manhã
    if (h >= 9 && h < 12)
      return {
        overlay: "bg-transparent",
        brightness: "brightness-[1.0]",
        isNight: false,
      };
    // 12-15: Meio-dia
    if (h >= 12 && h < 15)
      return {
        overlay: "bg-yellow-100/5",
        brightness: "brightness-[1.05]",
        isNight: false,
      };
    // 15-17: Tarde
    if (h >= 15 && h < 17)
      return {
        overlay: "bg-transparent",
        brightness: "brightness-[1.0]",
        isNight: false,
      };
    // 17-18: Golden Hour (Realça o laranja)
    if (h >= 17 && h < 18)
      return {
        overlay: "bg-orange-500/10",
        brightness: "brightness-[1.0]",
        isNight: false,
      };
    // 18-19: Crepúsculo (Entra a imagem de noite, mas sem escurecer demais)
    if (h >= 18 && h < 19)
      return {
        overlay: "bg-purple-900/10",
        brightness: "brightness-[1.0]",
        isNight: true,
      };
    // 19h em diante: Noite (Usamos a iluminação natural da sua imagem)
    return {
      overlay: "bg-transparent",
      brightness: "brightness-[1.0]",
      isNight: true,
    };
  };

  const config = getTimeConfig(hour);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Imagem de Dia */}
      <img
        src={autumnLightImg}
        alt="Autumn Day"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${config.brightness} ${
          config.isNight ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Imagem de Noite - Agora com 100% de brilho para mostrar sua iluminação original */}
      <img
        src={autumnDarkImg}
        alt="Autumn Night"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${config.brightness} ${
          config.isNight ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Camada Atmosférica Sutil (Apenas uma "corzinha" de leve) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-3000 ${config.overlay}`}
      />

      {/* Vinheta bem leve apenas nas bordas extremas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_60%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
};
