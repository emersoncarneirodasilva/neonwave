import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "../../../../hooks/useWindowSize";

import sitting01Img from "../../../../assets/images/people-sit-01.png";
import sitting02Img from "../../../../assets/images/people-sit-02.png";
import sitting03Img from "../../../../assets/images/people-sit-03.png";
import sitting04Img from "../../../../assets/images/people-sit-04.png";
import sitting05Img from "../../../../assets/images/people-sit-05.png";
import sitting06Img from "../../../../assets/images/people-sit-06.png";

const sittingPool = [
  sitting01Img,
  sitting02Img,
  sitting03Img,
  sitting04Img,
  sitting05Img,
  sitting06Img,
];

interface SittingPeopleProps {
  isNight: boolean;
  isRain: boolean;
}

export function SittingPeople({ isNight, isRain }: SittingPeopleProps) {
  const [currentPerson, setCurrentPerson] = useState<string | null>(null);
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  useEffect(() => {
    if (isRain || !isLarge) {
      setCurrentPerson(null);
      return;
    }

    const manageSitting = () => {
      if (currentPerson) {
        // Tempo que a pessoa fica sentada: 30s a 60s
        const stayDuration = Math.random() * 30000 + 30000;
        const timer = setTimeout(() => setCurrentPerson(null), stayDuration);
        return () => clearTimeout(timer);
      } else {
        // Dia: 10s a 30s de espera
        // Noite: 30s a 60s de espera (ajustado conforme solicitado)
        const minWait = isNight ? 30000 : 10000;
        const randomRange = isNight ? 30000 : 20000;

        const waitDuration = Math.random() * randomRange + minWait;

        const timer = setTimeout(() => {
          const randomImg =
            sittingPool[Math.floor(Math.random() * sittingPool.length)];
          setCurrentPerson(randomImg);
        }, waitDuration);
        return () => clearTimeout(timer);
      }
    };

    const mainTimer = setTimeout(manageSitting, 1000);
    return () => clearTimeout(mainTimer);
  }, [currentPerson, isRain, isLarge, isNight]);

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {currentPerson && (
          <motion.div
            key={currentPerson}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute flex flex-col items-center"
            style={{
              top: "33%",
              left: "2.5%",
              scale: 1.5,
              width: "110px",
              height: "110px",
              transformOrigin: "bottom center",
            }}
          >
            <img
              src={currentPerson}
              className="w-full h-full object-contain"
              style={{
                imageRendering: "pixelated",
                filter: `drop-shadow(0px 2px 2px rgba(0,0,0,0.3)) brightness(${isNight ? 0.6 : 1})`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
