import roomDawnImg from "../../../../assets/images/bedroom-at-dawn.png";
import roomMorningImg from "../../../../assets/images/bedroom-in-the-morning.png";
import roomDuskImg from "../../../../assets/images/bedroom-at-dusk.png";
import roomNightImg from "../../../../assets/images/bedroom-at-night.png";
import roomLateNightImg from "../../../../assets/images/bedroom-late-at-night.png";
import roomEarlyMorningImg from "../../../../assets/images/bedroom-in-the-early-morning.png";

const roomImages = [
  { img: roomEarlyMorningImg, start: 0, end: 5 }, // Madrugada
  { img: roomDawnImg, start: 5, end: 7 }, // Alvorecer
  { img: roomMorningImg, start: 7, end: 17 }, // Dia
  { img: roomDuskImg, start: 17, end: 19 }, // Entardecer
  { img: roomNightImg, start: 19, end: 22 }, // Noite
  { img: roomLateNightImg, start: 22, end: 24 }, // Noite Tardia
];

interface PureLightSceneProps {
  hour: number;
}

export const PureLightScene = ({ hour }: PureLightSceneProps) => {
  const activeScene = roomImages.find((i) => hour >= i.start && hour < i.end);

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent z-10">
      {/* Camadas do Quarto (Moldura Frontal) */}
      {roomImages.map((item, index) => (
        <img
          key={index}
          src={item.img}
          alt="Room"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-2000"
          style={{
            opacity: activeScene?.img === item.img ? 1 : 0,
            zIndex: 1,
          }}
        />
      ))}

      {/* Efeito de Glow: Mantendo o tema claro e focando na área do notebook */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(circle at 52% 63%, rgba(255,255,255,0.2) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};
