import dayImg from "../../../../assets/images/forest-bg-m.png";
import nightImg from "../../../../assets/images/forest-bg-n.png";

interface ForestLandscapeProps {
  isNight: boolean;
}

export const ForestLandscape = ({ isNight }: ForestLandscapeProps) => {
  return (
    <div className="absolute inset-0 w-full h-full z-10">
      {/* Imagem do Dia */}
      <img
        src={dayImg}
        alt="Day Forest"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-3000 ${
          isNight ? "opacity-0" : "opacity-100"
        }`}
        style={{ imageRendering: "pixelated" }}
      />

      {/* Imagem da Noite */}
      <img
        src={nightImg}
        alt="Night Forest"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-3000 ${
          isNight ? "opacity-100" : "opacity-0"
        }`}
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};
