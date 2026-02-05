import cyberpunkCityDawn from "../../../../assets/images/cyberpunk-city-dawn.png";
import cyberpunkCityMorning from "../../../../assets/images/cyberpunk-city-morning.png";
import cyberpunkCityEventide from "../../../../assets/images/cyberpunk-city-eventide.png";
import cyberpunkCityTwilight from "../../../../assets/images/cyberpunk-city-twilight.png";
import cyberpunkCityNight from "../../../../assets/images/cyberpunk-city-night.png";

export const CyberpunkCityScene = ({
  hour,
  isRaining,
  intensity,
}: {
  hour: number;
  isRaining: boolean;
  intensity: string;
}) => {
  const isNight = hour >= 19 || hour < 5;

  // Classe base para todas as imagens
  const imgClass =
    "absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ease-in-out";

  return (
    <>
      <img
        src={cyberpunkCityDawn}
        className={`${imgClass} ${hour >= 5 && hour < 7 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={cyberpunkCityMorning}
        className={`${imgClass} ${hour >= 7 && hour < 16 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={cyberpunkCityEventide}
        className={`${imgClass} ${hour >= 16 && hour < 17 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={cyberpunkCityTwilight}
        className={`${imgClass} ${hour >= 17 && hour < 19 ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={cyberpunkCityNight}
        className={`${imgClass} ${isNight ? "opacity-100" : "opacity-0"}`}
      />

      {/* Overlay de chuva para escurecer o cenário levemente quando chove */}
      <div
        className={`absolute inset-0 z-1 bg-black transition-opacity duration-3000 pointer-events-none ${
          isRaining
            ? intensity === "high"
              ? "opacity-60"
              : "opacity-30"
            : "opacity-0"
        }`}
      />
    </>
  );
};
