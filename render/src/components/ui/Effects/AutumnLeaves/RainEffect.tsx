import { motion } from "framer-motion";

export function RainEffect({ isNight }: { isNight: boolean }) {
  // Cria 100 gotas de chuva
  const drops = Array.from({ length: 100 });

  return (
    <div className="absolute inset-0 pointer-events-none z-45 overflow-hidden">
      {drops.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            top: "-10%",
            left: `${Math.random() * 100}%`,
            opacity: isNight ? 0.3 : 0.5,
          }}
          animate={{
            top: "110%",
            left: `${parseFloat(`${Math.random() * 100}`) - 10}%`, // Cai inclinado
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5, // Velocidades diferentes
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
          className="absolute w-px h-3.75 bg-white/40"
          style={{
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Overlay sutil para escurecer um pouco o ambiente na chuva */}
      <div
        className={`absolute inset-0 bg-blue-900/10 transition-opacity duration-1000`}
      />
    </div>
  );
}
