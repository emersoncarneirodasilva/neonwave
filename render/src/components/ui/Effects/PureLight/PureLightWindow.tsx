import landscapeDawnImg from "../../../../assets/images/city-in-the-window-dawn.png";
import landscapeMorningImg from "../../../../assets/images/city-in-the-window-morning.png";
import landscapeDuskImg from "../../../../assets/images/city-in-the-window-dusk.png";
import landscapeNightImg from "../../../../assets/images/city-in-the-window-night.png";
import { useWindowSize } from "../../../../hooks/useWindowSize";

const landscapeImages = [
  { img: landscapeNightImg, start: 0, end: 5 }, // Madrugada (00h às 05h)
  { img: landscapeDawnImg, start: 5, end: 7 }, // Alvorecer
  { img: landscapeMorningImg, start: 7, end: 17 }, // Dia
  { img: landscapeDuskImg, start: 17, end: 19 }, // Entardecer
  { img: landscapeNightImg, start: 19, end: 24 }, // Noite (19h às 23:59)
];

interface PureLightWindowProps {
  hour: number;
  isRaining: boolean; // Adicionamos a prop de chuva
}

export const PureLightWindow = ({ hour, isRaining }: PureLightWindowProps) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  const activeLandscape = landscapeImages.find(
    (i) => hour >= i.start && hour < i.end,
  );

  return (
    <div
      className="absolute overflow-hidden pointer-events-none transition-all duration-4000"
      style={{
        top: isLarge ? "12%" : "15.3%",
        left: "38.7%",
        width: "68%",
        height: isLarge ? "61%" : "51%",
        zIndex: 0,
        // Aplica o embaçamento na cidade inteira quando chove
        // Um valor entre 2px e 4px costuma ser o ideal para não "sumir" com a arte
        filter: isRaining ? "blur(3px) brightness(0.8)" : "none",
      }}
    >
      {landscapeImages.map((item, index) => (
        <img
          key={index}
          src={item.img}
          alt="Landscape"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-2000"
          style={{
            opacity: activeLandscape?.img === item.img ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};
