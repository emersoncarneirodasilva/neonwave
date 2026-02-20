interface SpaceBackgroundProps {
  decimalHour: number;
}

export const SpaceBackground = ({ decimalHour }: SpaceBackgroundProps) => {
  // Definição de períodos
  const isNight = decimalHour < 5 || decimalHour >= 19;

  // --- LÓGICA DO SOL (05:00 às 19:00) ---
  const sunProgress = (decimalHour - 5) / (19 - 5);
  const sunX = 0 + sunProgress * 100;
  const sunY = 60 - Math.sin(sunProgress * Math.PI) * 40;

  // --- LÓGICA DA LUA (19:00 às 05:00) ---
  // Ajuste para lidar com a virada da meia-noite
  const nightHour = decimalHour >= 19 ? decimalHour : decimalHour + 24;
  const moonProgress = (nightHour - 19) / 10; // 10 horas de noite
  const moonX = 0 + moonProgress * 100;
  const moonY = 70 - Math.sin(moonProgress * Math.PI) * 35; // Órbita levemente diferente

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* 1. ESTRELAS: Dinâmicas conforme a luz */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: isNight ? 0.8 : 0.05,
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, white, transparent), 
            radial-gradient(1.5px 1.5px at 80% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 10%, white, transparent)
          `,
          backgroundSize: "250px 250px",
        }}
      />

      {/* 2. O SOL: Ativo durante o dia */}
      {!isNight && (
        <div
          className="absolute transition-all duration-1000 ease-linear"
          style={{
            left: `${sunX}%`,
            top: `${sunY}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* 2.1. Bloom Intenso (O que faz ele parecer "grande") */}
          <div className="absolute inset-0 w-62.5 h-62.5 -translate-x-1/2 -translate-y-1/2 bg-white/5 rounded-full blur-[60px]" />

          {/* 2.2. O Núcleo Real (O tamanho "físico" dele é pequeno) */}
          <div className="w-10 h-10 bg-white rounded-full shadow-[0_0_80px_40px_rgba(255,255,255,0.9)]" />

          {/* 2.3. Difração da Lente (Linhas finas que indicam luz extrema) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[0.5px] bg-white/30 blur-[1px] rotate-[-5deg]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[0.5px] bg-white/20 blur-[1px] rotate-15" />
        </div>
      )}

      {/* 3. A LUA: Ativa durante a noite */}
      {isNight && (
        <div
          className="absolute transition-all duration-1000 ease-linear"
          style={{
            left: `${moonX}%`,
            top: `${moonY}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Corpo da Lua */}
          <div
            className="w-11 h-11 rounded-full relative overflow-hidden bg-[#BDC3C7]"
            style={{
              // Mares lunares mais suaves para dar a textura característica
              backgroundImage: `
          radial-gradient(circle at 35% 35%, rgba(0,0,0,0.18) 0%, transparent 60%),
          radial-gradient(circle at 65% 65%, rgba(0,0,0,0.12) 0%, transparent 50%),
          radial-gradient(circle at 20% 70%, rgba(0,0,0,0.15) 0%, transparent 40%)
        `,
              boxShadow: `
          inset -12px -8px 15px rgba(0,0,0,0.45), 
          inset 3px 3px 6px rgba(255,255,255,0.4)
        `,
            }}
          >
            {/* Crateras principais com profundidade sutil */}
            <div className="absolute top-[25%] left-[30%] w-2 h-2 rounded-full bg-black/10 border-b border-r border-white/20" />
            <div className="absolute top-[50%] left-[65%] w-1.5 h-1.5 rounded-full bg-black/10 border-b border-r border-white/10" />
            <div className="absolute top-[70%] left-[35%] w-2.5 h-2.5 rounded-full bg-black/10 border-b border-r border-white/20" />

            {/* Reflexo de borda (Highlight) para dar volume esférico */}
            <div className="absolute inset-0 rounded-full border-t border-l border-white/10" />
          </div>

          {/* Glow externo quase imperceptível, como a luz refletida no vácuo */}
          <div className="absolute inset-0 w-full h-full rounded-full blur-[3px] bg-white/5 -z-10" />
        </div>
      )}
    </div>
  );
};
