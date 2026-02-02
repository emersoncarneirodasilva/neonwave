import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AppInfo = {
  name: string;
  version: string;
  status: string;
};

export default function SplashScreen() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [isExiting, setIsExiting] = useState(false); // Estado para controlar a animação de saída
  const navigate = useNavigate();

  useEffect(() => {
    window.neonwave.getAppInfo().then(setAppInfo);

    // Inicia a animação de saída aos 4.2 segundos (um pouco antes dos 5s totais)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4200);

    // Muda a rota efetivamente aos 5 segundos
    const navigateTimer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden z-9999 transition-opacity duration-700 ease-in-out ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* O fundo de elipse com as suas coordenadas salvas */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 animate-pulse opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 44% 33% at 52% 63%, #bc00ff 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 44% 33% at 52% 63%, transparent 0%, rgba(0,0,0,0.5) 60%, black 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center p-10 text-center">
        <h1
          className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none
                       text-transparent bg-clip-text bg-linear-to-r from-[#00f2ff] to-[#bc00ff] 
                       filter drop-shadow-[0_0_20px_rgba(0,242,255,0.6)] 
                       py-4 px-10"
        >
          NEONWAVE
        </h1>

        {appInfo && (
          <div className="mt-4 text-xs tracking-[0.4em] uppercase font-light text-[#00f2ff] opacity-80">
            <p className="bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
              {appInfo.status} — v{appInfo.version}
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-20 w-64 h-0.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-linear-to-r from-[#00f2ff] to-[#bc00ff] animate-progress shadow-[0_0_15px_#00f2ff]" />
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
