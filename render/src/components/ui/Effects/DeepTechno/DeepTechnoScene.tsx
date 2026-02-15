import darkRoomDawn from "../../../../assets/images/dark-room-dawn-02.png";
import darkRoomDay from "../../../../assets/images/dark-room-day-02.png";
import darkRoomDusk from "../../../../assets/images/dark-room-dusk-02.png";
import darkRoomNight from "../../../../assets/images/dark-room-night-02.png";

const darkRoomImages = [
  { img: darkRoomNight, start: 0, end: 5 }, // Madrugada profunda
  { img: darkRoomDawn, start: 5, end: 7 }, // Alvorecer neon
  { img: darkRoomDay, start: 7, end: 17 }, // "Dia" (ainda no clima dark)
  { img: darkRoomDusk, start: 17, end: 19 }, // Entardecer roxo
  { img: darkRoomNight, start: 19, end: 24 }, // Noite
];

interface DeepTechnoSceneProps {
  hour: number;
}

export const DeepTechnoScene = ({ hour }: DeepTechnoSceneProps) => {
  const activeScene = darkRoomImages.find(
    (i) => hour >= i.start && hour < i.end,
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent z-20">
      {/* Camadas do Quarto Dark */}
      {darkRoomImages.map((item, index) => (
        <img
          key={index}
          src={item.img}
          alt="Dark Room"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-2000"
          style={{
            opacity: activeScene?.img === item.img ? 1 : 0,
            zIndex: 1,
            // Um leve toque de contraste para a arte pixelada brilhar mais no tema dark
            filter: "contrast(1.1) brightness(0.9)",
          }}
        />
      ))}

      {/* Camada de Vinheta: Para dar foco total na janela e na mesa */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
};
