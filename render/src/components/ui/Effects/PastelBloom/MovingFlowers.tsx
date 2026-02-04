import { useEffect, useState } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";
import pinkPurpleflowersImg from "../../../../assets/images/pink-purple-flowers.png";
import fieldOfTheFlowersImg from "../../../../assets/images/fields-of-flowers.png";

export const MovingFlowers = ({ hour }: { hour: number }) => {
  const [offset, setOffset] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);

  const { width } = useWindowSize();
  const isLarge = width >= 1000;
  const speed = isLarge ? 3.5 : 1.5;

  // Alterna a cena a cada 1:30 (90.000ms)
  useEffect(() => {
    const sceneTimer = setInterval(() => {
      setCurrentScene((prev) => (prev === 0 ? 1 : 0));
    }, 90000);

    return () => clearInterval(sceneTimer);
  }, []);

  const getOutdoorFilter = (h: number) => {
    if (h >= 5 && h < 8)
      return "brightness(0.8) saturate(1.2) contrast(1.1) sepia(0.2)";
    if (h >= 8 && h < 16) return "brightness(1.1) saturate(1.1)";
    if (h >= 16 && h < 19)
      return "brightness(1.0) saturate(1.6) sepia(0.3) hue-rotate(-10deg)";
    return "brightness(0.4) saturate(0.6) contrast(1.3) hue-rotate(20deg)";
  };

  const outdoorFilter = getOutdoorFilter(hour);
  const currentImg =
    currentScene === 0 ? pinkPurpleflowersImg : fieldOfTheFlowersImg;

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setOffset((prev) => (prev <= -1533 ? 0 : prev - speed));
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return (
    <div className="absolute inset-0 z-20 overflow-hidden">
      <div
        className="flex h-full transition-opacity duration-3000"
        style={{
          transform: `translateX(${offset}px)`,
          willChange: "transform",
          imageRendering: "pixelated",
          position: "relative",
          top: "-50px",
          filter: outdoorFilter,
          transition: "filter 4000ms ease-in-out",
        }}
      >
        <img
          src={currentImg}
          style={{ minWidth: "1533px" }}
          className="h-full object-cover"
          alt="Flowers Layer 1"
        />
        <img
          src={currentImg}
          style={{ minWidth: "1533px" }}
          className="h-full object-cover"
          alt="Flowers Layer 2"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-linear-to-b from-transparent to-black/20" />
    </div>
  );
};
