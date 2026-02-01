import { motion } from "framer-motion";
import mountainImg from "../../../../assets/images/mountain.png";

export const MountainsLayer: React.FC = () => {
  const vFuga = 18.8;
  const hFuga = 44.1;
  const duration = 12;

  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`mtn-pixel-${i}`}
          className="absolute"
          style={{
            top: `${hFuga}%`,
            left: `${vFuga}%`,
            width: "500px", // Aumentamos um pouco para a textura renderizar melhor
            height: "180px",
            transformOrigin: "0% 100%",

            /* USANDO A IMAGEM COMO TEXTURA */
            backgroundImage: `url(${mountainImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",

            /* Mantemos o clipPath para dar o formato de montanha à imagem quadrada */
            clipPath: "path('M 0,150 L 100,80 L 225,10 L 350,80 L 500,150 Z')",

            /* Filtros para simular distância e atmosfera */
            filter: `
              drop-shadow(20px 10px 15px rgba(0,0,0,0.5))
              brightness(${0.8 + i * 0.1}) 
              contrast(1.1)
              image-rendering: pixelated; /* Crucial para manter o estilo pixel art */
            `,
          }}
          initial={{ x: "-5%", y: "5%", scale: 0.05, opacity: 0 }}
          animate={{
            x: "150%",
            y: "25%",
            scale: 5,
            opacity: [0, 0, 0.5, 1, 1, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeIn",
            delay: i * (duration / 4),
          }}
        >
          {/* CAMADA DE SOMBRA ATMOSFÉRICA: 
              Escurece a base da imagem para fundir com o horizonte */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
              mixBlendMode: "multiply",
            }}
          />
        </motion.div>
      ))}
    </>
  );
};
