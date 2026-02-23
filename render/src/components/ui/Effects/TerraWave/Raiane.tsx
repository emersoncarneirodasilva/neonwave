import RaianeImg from "../../../../assets/images/raiane-pixel.png";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface RaianeProps {
  hour: number;
}

export const Raiane = ({ hour }: RaianeProps) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const getCharacterFilter = () => {
    // 05h-07h: Amanhecer
    if (hour >= 5 && hour < 7)
      return { brightness: "0.85", saturate: "1.1", sepia: "0.2", hue: "0deg" };

    // 07h-16h: Dia
    if (hour >= 7 && hour < 16)
      return { brightness: "1", saturate: "1", sepia: "0", hue: "0deg" };

    // 16h-17h: Golden Hour
    if (hour >= 16 && hour < 17)
      return { brightness: "1", saturate: "1.4", sepia: "0.3", hue: "-5deg" };

    // 17h-19h: Crepúsculo (O tom que você gostou)
    if (hour >= 17 && hour < 19)
      return {
        brightness: "0.75",
        saturate: "1.2",
        sepia: "0.2",
        hue: "330deg",
      };

    // 19h+: Noite (Mesma base do crepúsculo, mas mais escuro)
    return {
      brightness: "0.40", // Mais escuro que o crepúsculo
      saturate: "1.3", // Saturação levemente maior para segurar a cor no escuro
      sepia: "0.1", // Reduzi o sepia para não amarronzar demais
      hue: "330deg", // Mantive os 330deg que funcionaram bem na pele
    };
  };

  const { brightness, saturate, sepia, hue } = getCharacterFilter();

  return (
    <div className="absolute bottom-[20%] right-[13%] w-62.5 z-20 pointer-events-none">
      <img
        src={RaianeImg}
        alt="Raiane sentada"
        className="w-full h-auto drop-shadow-[10px_5px_15px_rgba(0,0,0,0.3)] transition-all duration-1000"
        style={{
          filter: `brightness(${brightness}) saturate(${saturate}) sepia(${sepia}) hue-rotate(${hue})`,
          scale: isLarge ? "1.3" : "1.1",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
};
