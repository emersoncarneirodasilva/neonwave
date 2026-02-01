import React, { useReducer, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DunesLayer } from "./DunesLayer";
import { MountainsLayer } from "./MountainsLayer";

type State = {
  count: number;
  scenery: "dunes" | "mountains";
};

type Action = { type: "TICK" };

const sceneryReducer = (state: State, action: Action): State => {
  if (action.type === "TICK") {
    if (state.count >= 7) {
      const nextScenery: State["scenery"] =
        state.scenery === "dunes" ? "mountains" : "dunes";
      return { count: 0, scenery: nextScenery };
    }
    return { ...state, count: state.count + 1 };
  }
  return state;
};

interface SceneryProps {
  time: number;
}

export const SceneryLayer: React.FC<SceneryProps> = ({ time }) => {
  const [state, dispatch] = useReducer(sceneryReducer, {
    count: 0,
    scenery: "dunes",
  });

  // Lógica de Brilho Sincronizada
  const brightness = useMemo(() => {
    if (time >= 6 && time <= 18.5) return 1; // Dia
    if (time > 19 || time < 5) return 0.3; // Noite

    // Anoitecer (18:30 - 19:00)
    if (time > 18.5 && time <= 19) {
      const progress = (time - 18.5) / 0.5;
      return 1 - progress * 0.7;
    }

    // Amanhecer (05:00 - 06:00)
    if (time >= 5 && time < 6) {
      const progress = (time - 5) / 1;
      return 0.3 + progress * 0.7;
    }

    return 1;
  }, [time]);

  const vFuga = 18.8;
  const hFuga = 44.1;
  const topo = 8.5;
  const base = 49.6;
  const duration = 12;
  const polygonArea = `polygon(${vFuga}% ${hFuga}%, 100% ${topo}%, 100% ${base}%, ${vFuga}% ${hFuga}%)`;

  useEffect(() => {
    const intervalTime = (duration / 4) * 1000;
    const timer = setInterval(() => dispatch({ type: "TICK" }), intervalTime);
    return () => clearInterval(timer);
  }, [duration]);

  return (
    // bg-transparent para não cobrir o SkyCycle
    <div className="relative w-full h-screen bg-transparent overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          zIndex: 2,
          clipPath: polygonArea,
          WebkitClipPath: polygonArea,
          filter: `brightness(${brightness})`, // Aplica o brilho em todo o cenário
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={state.scenery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {state.scenery === "dunes" && <DunesLayer time={time} />}
            {state.scenery === "mountains" && <MountainsLayer />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-5 left-5 text-white/20 text-[10px] font-mono uppercase">
        {state.scenery} | {state.count + 1}/5
      </div>
    </div>
  );
};
