import { useMemo } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import train from "../../../../assets/images/train.png";
import greenTrain from "../../../../assets/images/green-train.png";
import purpleTrain from "../../../../assets/images/purple-train.png";

interface SkyTrainProps {
  isNight: boolean;
}

export const SkyTrain = ({ isNight }: SkyTrainProps) => {
  const { width } = useWindowSize();

  // CONFIGURAÇÃO DE TEMPO (3 trens de 30s cada = 90s total)
  const travelTime = 30;
  const totalCycle = `${travelTime * 3}s`;
  const trainLength = "600px";
  const syncGap = "-450px";

  // Alterna entre as configurações baseada na largura da tela
  const config = useMemo(() => {
    const isLarge = width >= 1000;

    return {
      railGroupY: "50%",
      imgHeight: "130%",
      imgRotate: "-18deg",
      vOffset: "-2px",
      distScale: -0.65,
      // Configurações para o Trecho 1 (Perto)
      t1: isLarge
        ? { left: "45%", top: "50%", width: "14%", rot: "-154deg" } // Tela Grande
        : { left: "43%", top: "49%", width: "20%", rot: "-154deg" }, // Tela Pequena
      // Configurações para o Trecho 2 (Longe)
      t2: isLarge
        ? { left: "12%", top: "24.8%", width: "14%", rot: "-154deg" } // Tela Grande
        : { left: "-5%", top: "24.1%", width: "20%", rot: "-154deg" }, // Tela Pequena
    };
  }, [width]);

  const TrainGroup = ({
    img,
    delay,
    isSmall = false,
  }: {
    img: string;
    delay: string;
    isSmall?: boolean;
  }) => (
    <div
      className="train-anim-wrapper"
      style={{
        width: trainLength,
        animationDuration: totalCycle,
        animationDelay: delay,
        marginLeft: isSmall ? syncGap : "0",
      }}
    >
      <img
        src={img}
        className="train-asset"
        style={{
          height: config.imgHeight,
          transform: `scale(${isSmall ? config.distScale : -1}, ${
            isSmall ? config.distScale : -1
          }) rotate(${config.imgRotate}) translateY(${config.vOffset})`,
          filter: `${isNight ? "brightness(0.6)" : "brightness(1)"} contrast(1.2) drop-shadow(0 0 10px rgba(34, 211, 238, 0.3))`,
        }}
        alt="Sky Train"
      />
    </div>
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* TRECHO 1 (PERTO) */}
      <div
        className="absolute overflow-hidden transition-all duration-700 ease-in-out"
        style={{
          left: config.t1.left,
          top: config.t1.top,
          width: config.t1.width,
          height: "80px",
          transform: `rotate(${config.t1.rot})`,
        }}
      >
        <div
          className="absolute left-0 right-0 flex flex-col items-center"
          style={{ top: config.railGroupY }}
        >
          <div className="rail-neon-line" />
        </div>
        <TrainGroup img={train} delay="0s" />
        <TrainGroup img={greenTrain} delay={`${travelTime}s`} />
        <TrainGroup img={purpleTrain} delay={`${travelTime * 2}s`} />
      </div>

      {/* TRECHO 2 (LONGE) */}
      <div
        className="absolute overflow-hidden transition-all duration-700 ease-in-out"
        style={{
          left: config.t2.left,
          top: config.t2.top,
          width: config.t2.width,
          height: "80px",
          transform: `rotate(${config.t2.rot})`,
        }}
      >
        <div
          className="absolute left-0 right-0 flex flex-col items-center"
          style={{ top: config.railGroupY }}
        >
          <div className="rail-neon-line" />
        </div>
        <TrainGroup img={train} delay="0s" isSmall />
        <TrainGroup img={greenTrain} delay={`${travelTime}s`} isSmall />
        <TrainGroup img={purpleTrain} delay={`${travelTime * 2}s`} isSmall />
      </div>

      <style>{`
        .train-anim-wrapper {
          position: absolute;
          height: 100%;
          display: flex;
          align-items: center;
          animation: trainTravel linear infinite;
          will-change: transform;
          transform: translateX(-200%);
        }

        .train-asset {
          width: auto;
          image-rendering: pixelated;
        }

        .rail-neon-line {
          width: 100%; height: 1px;
          background: rgba(34, 211, 238, 0.5);
          animation: neonPulse 3s ease-in-out infinite;
        }

        @keyframes trainTravel {
          0% { transform: translateX(-150%); }
          33.33% { transform: translateX(600%); }
          100% { transform: translateX(600%); }
        }

        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 4px rgba(34, 211, 238, 0.2); opacity: 0.4; }
          50% { box-shadow: 0 0 12px rgba(34, 211, 238, 0.6); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
