import spaceStationImg from "../../../../assets/images/space-station.png";

interface SteelWaveSceneProps {
  isNight: boolean;
}

export const SteelWaveScene = ({ isNight }: SteelWaveSceneProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent z-40">
      {/* Imagem Única da Estação */}
      <img
        src={spaceStationImg}
        alt="Space Station"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-3000 ease-in-out"
        style={{
          imageRendering: "pixelated",
          filter: isNight
            ? "brightness(0.75) contrast(1.1) saturate(0.9)"
            : "brightness(1) contrast(1) saturate(1)",
        }}
      />

      {/* Camada de Overlay Noturno (Azulado bem sutil para o clima Lo-Fi) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-3000 z-30"
        style={{
          opacity: isNight ? 0.4 : 0, // Opacidade menor para não soterrar a imagem
          background:
            "linear-gradient(to bottom, rgba(0, 30, 80, 0.1), rgba(0, 5, 15, 0.4))",
        }}
      />

      {/* Vinheta de profundidade */}
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
};
