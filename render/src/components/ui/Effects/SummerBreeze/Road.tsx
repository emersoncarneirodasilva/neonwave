import { motion } from "framer-motion";

export interface RoadConfig {
  topo: number;
  altura: number;
  posX: number;
  qtd: number;
  largura: number;
  comprimento: number;
  espacamento: number;
  perspectiva: number;
  rotacaoX: number;
  velocidade: number;
  fimAnimacao: number;
}

interface RoadProps {
  config: RoadConfig;
}

export const Road: React.FC<RoadProps> = ({ config }) => (
  <div
    className="absolute inset-x-0 flex justify-center overflow-hidden"
    style={{
      zIndex: 5,
      top: `${config.topo}%`,
      height: `${config.altura}%`,
      pointerEvents: "none",
    }}
  >
    <div
      className="relative h-full w-200"
      style={{
        perspective: `${config.perspectiva}px`,
        perspectiveOrigin: `${config.posX}% 0%`,
      }}
    >
      <div
        className="absolute inset-0 flex flex-col items-center"
        style={{
          left: `${config.posX}%`,
          transform: `translateX(-50%) rotateX(${config.rotacaoX}deg)`,
          transformOrigin: "center 0%",
        }}
      >
        {[...Array(config.qtd)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-[#f0e6d2]"
            style={{
              width: `${config.largura}px`,
              height: `${config.comprimento}px`,
              marginBottom: `${config.espacamento}px`,
              flexShrink: 0,
            }}
            initial={{ y: "-100%" }}
            animate={{ y: `${config.fimAnimacao}%` }}
            transition={{
              duration: config.velocidade,
              repeat: Infinity,
              ease: "linear",
              delay: i * (config.velocidade / config.qtd),
            }}
          />
        ))}
      </div>
    </div>
  </div>
);
