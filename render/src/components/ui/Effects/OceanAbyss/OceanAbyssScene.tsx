import oceanDayImg from "../../../../assets/images/ocean-bg-light.png";
import oceanNightImg from "../../../../assets/images/ocena-bg-dark.png";

export const OceanAbyssScene = ({ isNight }: { isNight: boolean }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Imagem de Fundo - Versão Dia */}
      <img
        src={oceanDayImg}
        alt="Ocean Day"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isNight ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Imagem de Fundo - Versão Noite */}
      <img
        src={oceanNightImg}
        alt="Ocean Night"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isNight ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay de Vinheta para profundidade extra */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/30 pointer-events-none" />
    </div>
  );
};
