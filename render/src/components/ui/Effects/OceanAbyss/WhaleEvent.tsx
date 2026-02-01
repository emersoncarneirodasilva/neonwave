import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import whaleImg from "../../../../assets/images/whale.png";

interface WhaleProps {
  isNight: boolean;
}

export function WhaleEvent({ isNight }: WhaleProps) {
  const controls = useAnimation();

  const startSwim = async () => {
    controls.set({
      x: "-110vw",
      y: "-60vh",
      scale: 0.7,
      opacity: 0,
    });

    await controls.start({
      x: "130vw",
      opacity: isNight ? [0, 0.6, 0.6, 0] : [0, 1, 1, 0],
      transition: {
        duration: 50,
        ease: "linear",
      },
    });

    const nextWait = Math.random() * (80000 - 40000) + 40000;
    setTimeout(startSwim, nextWait);
  };

  useEffect(() => {
    const timer = setTimeout(startSwim, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <motion.img
        src={whaleImg}
        animate={controls}
        initial={{ opacity: 0 }}
        style={{
          width: "550px",
          filter: isNight
            ? "brightness(0.4) contrast(1.2) saturate(0.8)"
            : "brightness(1.1) contrast(1.1) saturate(1.2)",
          transition: "filter 2s ease-in-out",
        }}
        className="absolute left-1/2 top-1/2"
      />
    </div>
  );
}
