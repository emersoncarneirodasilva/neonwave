import { useWindowSize } from "../../../../hooks/useWindowSize";

import cityDawnImg from "../../../../assets/images/dark-city-dawn.png";
import cityDayImg from "../../../../assets/images/dark-city-day.png";
import cityDuskImg from "../../../../assets/images/dark-city-dusk.png";
import cityNightImg from "../../../../assets/images/dark-city-night.png";

interface CityBuildingsProps {
  hour: number;
}

export const CityBuildings = ({ hour }: CityBuildingsProps) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  // Mapeamento de estados para facilitar a renderização
  const timeStates = [
    { id: "dawn", img: cityDawnImg, active: hour >= 5 && hour < 7 },
    { id: "day", img: cityDayImg, active: hour >= 7 && hour < 17 },
    { id: "dusk", img: cityDuskImg, active: hour >= 17 && hour < 19 },
    { id: "night", img: cityNightImg, active: hour >= 19 || hour < 5 },
  ];

  return (
    <div
      className="absolute pointer-events-none overflow-hidden transition-all duration-1000"
      style={{
        top: isLarge ? "0%" : "15%",
        left: isLarge ? "7%" : "7%",
        width: isLarge ? "70%" : "70%",
        height: isLarge ? "71%" : "50%",
        zIndex: 5,
      }}
    >
      {timeStates.map((state) => (
        <img
          key={state.id}
          src={state.img}
          alt={`City ${state.id}`}
          className="absolute inset-0 w-full h-full object-left transition-opacity duration-2000 ease-in-out"
          style={{
            opacity: state.active ? 1 : 0,
            filter:
              state.id === "night" ? "brightness(0.8) contrast(1.2)" : "none",
          }}
        />
      ))}
    </div>
  );
};
