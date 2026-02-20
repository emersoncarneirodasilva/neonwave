import { useWindowSize } from "../../../../hooks/useWindowSize";

interface CockpitLightProps {
  top: string;
  left: string;
  width?: string;
  height?: string;
  color: string;
  rounded?: string;
  blur?: number;
  opacity?: number;
  pulse?: boolean;
  duration?: number;
}

export const CockpitLight = ({
  top,
  left,
  width = "6px",
  height = "6px",
  color,
  rounded = "rounded-full",
  blur = 8,
  opacity = 0.8,
  pulse = true,
  duration = 2,
}: CockpitLightProps) => {
  return (
    <div
      className={`absolute pointer-events-none transition-all ${rounded}`}
      style={{
        top,
        left,
        width,
        height,
        backgroundColor: color,
        opacity: opacity,
        zIndex: 60,
        filter: `blur(${blur / 3}px)`,
        boxShadow: `0 0 ${blur}px ${blur / 4}px ${color}`,
        animation: pulse
          ? `panel-light-pulse ${duration}s infinite ease-in-out`
          : "none",
      }}
    />
  );
};

export const CockpitIllumination = ({ isNight }: { isNight: boolean }) => {
  const { width } = useWindowSize();
  const isLarge = width >= 1000;

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes panel-light-pulse {
              0%, 100% { opacity: 0.8; filter: brightness(1.3) blur(2px); }
              50% { opacity: 0.3; filter: brightness(0.8) blur(4px); }
            }
          `,
        }}
      />

      {isNight && (
        <>
          {/* --- LUZ SUPERIOR (CABIN LIGHTING) --- */}
          <CockpitLight
            top="4.5%"
            left={isLarge ? "46%" : "44%"}
            width={isLarge ? "100px" : "80px"}
            height="4px"
            color="#fef3c7"
            rounded="rounded-full"
            blur={40}
            opacity={0.3}
            pulse={true}
            duration={6}
          />

          {/* Pequeno detalhe nítido no centro da lâmpada superior */}
          <CockpitLight
            top="4%"
            left={isLarge ? "48.5%" : "48%"}
            width={isLarge ? "40px" : "25px"}
            height="2px"
            color="#ffffff"
            rounded="rounded-full"
            blur={10}
            opacity={0.5}
            pulse={false}
          />
        </>
      )}

      {/* --- BOTÕES RETANGULARES (ESQUERDA) --- */}
      <CockpitLight
        top="37.3%"
        left={isLarge ? "22.45%" : "9.5%"}
        color="#f97316"
        width="8px"
        height="5px"
        rounded="rounded-none"
        blur={6}
        duration={2}
      />
      <CockpitLight
        top="38.5%"
        left={isLarge ? "22.45%" : "9.5%"}
        color="#0d5baa"
        width="8px"
        height="5px"
        rounded="rounded-none"
        blur={6}
        duration={4}
      />
      <CockpitLight
        top="39.8%"
        left={isLarge ? "22.45%" : "9.5%"}
        color="#22c55e"
        width="8px"
        height="5px"
        rounded="rounded-none"
        blur={6}
        pulse={false}
      />
      <CockpitLight
        top="52.5%"
        left={isLarge ? "21.8%" : "8.5%"}
        width="10px"
        height="15px"
        color="#f97316"
        rounded="rounded-none"
        blur={6}
        pulse={false}
      />

      <CockpitLight
        top="50.6%"
        left={isLarge ? "17.6%" : "2.4%"}
        width="6px"
        height="6px"
        color="#f97316"
        rounded="rounded-none"
        blur={6}
        duration={5}
      />
      <CockpitLight
        top="52.1%"
        left={isLarge ? "17.6%" : "4.2%"}
        width="6px"
        height="6px"
        color="#f97316"
        rounded="rounded-none"
        blur={6}
        pulse={false}
      />
      <CockpitLight
        top="52.1%"
        left={isLarge ? "18.8%" : "2.4%"}
        width="6px"
        height="6px"
        color="#f97316"
        rounded="rounded-none"
        blur={6}
        pulse={false}
      />

      {/* --- BOTÕES "MANCHADOS" (REAIS BORRÕES) --- */}
      {/* Botões esquerdo */}
      <CockpitLight
        top="76.2%"
        left={isLarge ? "17.5%" : "2%"}
        color="#f97316"
        width="10px"
        height="10px"
        blur={20}
        duration={3}
        opacity={0.6}
      />
      <CockpitLight
        top="80.2%"
        left={isLarge ? "22%" : "8.7%"}
        color="#22c55e"
        width="10px"
        height="10px"
        blur={20}
        duration={5}
        opacity={0.6}
      />
      <CockpitLight
        top="82.6%"
        left={isLarge ? "23.3%" : "10.6%"}
        color="#0d5baa"
        width="12px"
        height="8px"
        rounded="rounded-full"
        blur={8}
        pulse={false}
      />

      {/* --- BOTÕES RETANGULARES (DIREITA) --- */}
      {/* Bloco de botões superiores (Direito) */}
      <CockpitLight
        top="38%"
        left={isLarge ? "79%" : "92.6%"}
        color="#f97316"
        width="4px"
        height="8px"
        rounded="rounded-none"
        blur={6}
        pulse={false}
      />
      <CockpitLight
        top="38%"
        left={isLarge ? "80.6%" : "94.9%"}
        color="#f97316"
        width="9px"
        height="8px"
        rounded="rounded-none"
        blur={6}
        duration={5}
      />
      {/* Botão Verde */}
      <CockpitLight
        top={isLarge ? "48.2%" : "48%"}
        left={isLarge ? "79.3%" : "93%"}
        width="10px"
        height="5px"
        color="#22c55e"
        rounded="rounded-none"
        blur={6}
        duration={5}
      />

      {/* O Marcador Azul (Direito) */}
      <CockpitLight
        top={isLarge ? "75.7%" : "75.4%"}
        left={isLarge ? "79.5%" : "93.2%"}
        width="25px"
        height="25px"
        color="#22d3ee"
        rounded="rounded-full"
        blur={20}
        opacity={0.5}
        pulse={false}
      />
      {/* Botões Inferiores (Direito) */}
      <CockpitLight
        top="82.8%"
        left={isLarge ? "79.1%" : "92.2%"}
        color="#f97316"
        width="10px"
        height="10px"
        blur={10}
        duration={5}
        opacity={0.6}
      />
      <CockpitLight
        top="83.8%"
        left={isLarge ? "79.9%" : "93.7%"}
        color="#f97316"
        width="10px"
        height="10px"
        blur={6}
        pulse={false}
      />
      <CockpitLight
        top="86%"
        left={isLarge ? "81.7%" : "96.5%"}
        color="#f97316"
        width="10px"
        height="10px"
        blur={6}
        pulse={false}
      />

      {/* Botões Centrais */}
      <CockpitLight
        top="98.2%"
        left={isLarge ? "49.6%" : "49%"}
        width="15px"
        height="15px"
        color="#f97316"
        rounded="rounded-none"
        blur={10}
        duration={4}
      />
      <CockpitLight
        top="98%"
        left={isLarge ? "57.3%" : "60.6%"}
        width="5px"
        height="7px"
        color="#0d5baa"
        rounded="rounded-none"
        blur={6}
        duration={2}
      />
      <CockpitLight
        top="98.4%"
        left={isLarge ? "58.4%" : "62.3%"}
        width="9px"
        height="10px"
        color="#f97316"
        rounded="rounded-none"
        blur={6}
        pulse={false}
      />
      <CockpitLight
        top="98.4%"
        left={isLarge ? "60.8%" : "65.8%"}
        width="5px"
        height="10px"
        color="#22c55e"
        rounded="rounded-none"
        blur={6}
        pulse={false}
      />

      {/* Botões (Tela Grande) */}
      {isLarge && (
        <>
          {/* Superior Esquerdo */}
          <CockpitLight
            top="1.2%"
            left="2.7%"
            color="#f97316"
            width="10px"
            height="10px"
            blur={20}
            duration={3}
            opacity={0.6}
          />
          <CockpitLight
            top="4.8%"
            left="2%"
            color="#f97316"
            width="18px"
            height="18px"
            blur={20}
            duration={5}
            opacity={0.6}
          />
          <CockpitLight
            top="8%"
            left="5.5%"
            color="#f97316"
            width="18px"
            height="18px"
            blur={10}
            duration={5}
            pulse={false}
          />
          <CockpitLight
            top="10%"
            left="7.9%"
            color="#f97316"
            width="18px"
            height="18px"
            blur={20}
            duration={2}
            opacity={0.6}
          />

          {/* Inferior Esquerdo */}
          <CockpitLight
            top="88.5%"
            left="3%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={20}
            duration={5}
            opacity={0.6}
          />
          <CockpitLight
            top="87.3%"
            left="11.3%"
            color="#22c55e"
            width="10px"
            height="10px"
            blur={20}
            duration={2}
            opacity={0.6}
          />
          <CockpitLight
            top="86.5%"
            left="12.6%"
            color="#22c55e"
            width="10px"
            height="10px"
            blur={6}
            pulse={false}
            opacity={0.6}
          />

          <CockpitLight
            top="93%"
            left="8.8%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={10}
            pulse={false}
            opacity={0.6}
          />
          <CockpitLight
            top="98%"
            left="7.4%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={10}
            pulse={false}
            opacity={0.6}
          />
          <CockpitLight
            top="96.8%"
            left="8.7%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={20}
            duration={5}
            opacity={0.6}
          />

          {/* Superior Direito */}
          <CockpitLight
            top="8.5%"
            left="93.2%"
            color="#f97316"
            width="15px"
            height="18px"
            blur={6}
            pulse={false}
            opacity={0.6}
          />
          <CockpitLight
            top="5.3%"
            left="96.9%"
            color="#f97316"
            width="18px"
            height="18px"
            blur={20}
            duration={3}
            opacity={0.6}
          />
          <CockpitLight
            top="3.8%"
            left="98.6%"
            color="#f97316"
            width="18px"
            height="18px"
            blur={20}
            duration={6}
            opacity={0.6}
          />
          <CockpitLight
            top="11%"
            left="95.3%"
            color="#f97316"
            width="15px"
            height="18px"
            blur={6}
            pulse={false}
            opacity={0.6}
          />
          <CockpitLight
            top="9%"
            left="98%"
            color="#22c55e"
            width="18px"
            height="18px"
            blur={6}
            pulse={false}
            opacity={0.6}
          />

          {/* Inferior Direito */}
          <CockpitLight
            top="82.2%"
            left="92.3%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={20}
            duration={4}
            opacity={0.6}
          />
          <CockpitLight
            top="83%"
            left="93.4%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={20}
            duration={4}
            opacity={0.6}
          />
          <CockpitLight
            top="84%"
            left="94.4%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={6}
            pulse={false}
            opacity={0.6}
          />
          <CockpitLight
            top="86.3%"
            left="93.5%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={6}
            pulse={false}
            opacity={0.6}
          />
          <CockpitLight
            top="86.6%"
            left="90.4%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={6}
            pulse={false}
            opacity={0.6}
          />
          <CockpitLight
            top="89.4%"
            left="93.3%"
            color="#f97316"
            width="15px"
            height="15px"
            blur={6}
            pulse={false}
            opacity={0.6}
          />
        </>
      )}
    </div>
  );
};
