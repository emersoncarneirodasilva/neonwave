import { useState, useEffect, useMemo } from "react";

import lunaSit from "../../../../assets/images/luna-sit.png";
import lunaWalking from "../../../../assets/images/luna-walking.png";
import billySit from "../../../../assets/images/billy-sit.png";
import billyWalking from "../../../../assets/images/billy-walking.png";
import melSit from "../../../../assets/images/mel-sit.png";
import melWalking from "../../../../assets/images/mel-walking.png";
import mayaSit from "../../../../assets/images/maya-sit.png";
import mayaWalking from "../../../../assets/images/maya-walking.png";
import { useWindowSize } from "../../../../hooks/useWindowSize";

interface PetProps {
  hour: number;
}

export const BeachPets = ({ hour }: PetProps) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  // --- ESTADOS COM SORTEIO INICIAL ---
  const [currentPetIdx, setCurrentPetIdx] = useState(() =>
    Math.floor(Math.random() * 4),
  );
  const [isSitting, setIsSitting] = useState(() => Math.random() > 0.5);
  const [walkDirection, setWalkDirection] = useState<"L2R" | "R2L">(() =>
    Math.random() > 0.5 ? "L2R" : "R2L",
  );
  const [randomY, setRandomY] = useState(() => Math.random() * 5); // Variação de altura inicial
  const [walkDuration, setWalkDuration] = useState(20000);
  const [isVisible, setIsVisible] = useState(true);

  // --- CONFIGURAÇÃO DE PETS (Responsiva) ---
  const pets = useMemo(
    () => [
      {
        name: "Luna",
        sit: lunaSit,
        walk: lunaWalking,
        scale: isLarge ? 2.7 : 2.5,
      },
      {
        name: "Billy",
        sit: billySit,
        walk: billyWalking,
        scale: isLarge ? 2.5 : 2.3,
      },
      {
        name: "Maya",
        sit: mayaSit,
        walk: mayaWalking,
        scale: isLarge ? 2.0 : 1.8,
      },
      {
        name: "Mel",
        sit: melSit,
        walk: melWalking,
        scale: isLarge ? 1.8 : 1.6,
      },
    ],
    [isLarge],
  );

  const filterStyle = useMemo(() => {
    if (hour >= 17 || hour < 7) {
      return {
        brightness: hour >= 19 || hour < 5 ? "0.40" : "0.75",
        saturate: "1.3",
        hue: "330deg",
      };
    }
    return { brightness: "1", saturate: "1", hue: "0deg" };
  }, [hour]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        const nextIsSitting = Math.random() > 0.5;
        const nextPetIdx = Math.floor(Math.random() * pets.length);
        const nextDirection = Math.random() > 0.5 ? "L2R" : "R2L";
        const nextDuration = Math.floor(Math.random() * 10000) + 18000;
        const nextY = Math.random() * 5; // Sorteia nova altura (0% a 5% de variação)

        setIsSitting(nextIsSitting);
        setCurrentPetIdx(nextPetIdx);
        setWalkDirection(nextDirection);
        setWalkDuration(nextDuration);
        setRandomY(nextY);
        setIsVisible(true);
      }, 1000);
    }, 22000);

    return () => clearInterval(timer);
  }, [pets.length]);

  const pet = pets[currentPetIdx];

  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      {/* PET SENTADO */}
      <div
        className="absolute transition-opacity duration-1000"
        style={{
          bottom: `${18 - randomY}%`, // Varia a altura sentado também
          right: "28%",
          opacity: isSitting && isVisible ? 1 : 0,
        }}
      >
        <img
          src={pet.sit}
          alt="Pet sentado"
          style={{
            filter: `brightness(${filterStyle.brightness}) saturate(${filterStyle.saturate}) hue-rotate(${filterStyle.hue})`,
            imageRendering: "pixelated",
            transform: `scale(${pet.scale})`,
          }}
          className="w-16 h-auto"
        />
      </div>

      {/* PET CAMINHANDO */}
      <div
        className="absolute"
        style={{
          bottom: `${15 - randomY}%`, // Aplica a variação de altura
          transition: `opacity 1000ms ease-in-out, left ${!isSitting && isVisible ? walkDuration : 0}ms linear`,
          opacity: !isSitting && isVisible ? 1 : 0,
          // Lógica de posição:
          left:
            !isSitting && isVisible
              ? walkDirection === "L2R"
                ? "115%"
                : "-15%" // Destino final
              : walkDirection === "L2R"
                ? "-15%"
                : "115%", // Ponto de partida
        }}
      >
        <img
          src={pet.walk}
          alt="Pet caminhando"
          style={{
            filter: `brightness(${filterStyle.brightness}) saturate(${filterStyle.saturate}) hue-rotate(${filterStyle.hue})`,
            imageRendering: "pixelated",
            // scaleX(-1) apenas quando vai para a direita (L2R)
            transform: `scale(${pet.scale}) ${walkDirection === "L2R" ? "scaleX(-1)" : "scaleX(1)"}`,
          }}
          className="w-16 h-auto"
        />
      </div>
    </div>
  );
};
