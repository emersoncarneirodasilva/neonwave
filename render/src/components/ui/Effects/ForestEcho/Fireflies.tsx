import { useMemo } from "react";

export const Fireflies = ({ isNight }: { isNight: boolean }) => {
  const count = 25;

  const flies = useMemo(() => {
    return Array.from({ length: count }).map((_) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 90}%`,
      duration: `${15 + Math.random() * 20}s`,
      delay: `${Math.random() * 10}s`,
      size: `${1.5 + Math.random() * 2.5}px`,
    }));
  }, []);

  return (
    <div
      className={`absolute inset-0 z-11 pointer-events-none transition-opacity duration-5000 ${
        isNight ? "opacity-100" : "opacity-0"
      }`}
    >
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(50px, -40px); }
          50% { transform: translate(-30px, 30px); }
          75% { transform: translate(40px, -20px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes flash {
          0%, 100% { opacity: 0; filter: blur(2px); }
          50% { opacity: 1; filter: blur(0.5px); }
        }

        .firefly {
          position: absolute;
          background: #d4fc79;
          border-radius: 50%;
          box-shadow: 0 0 5px #d4fc79, 0 0 12px rgba(212, 252, 121, 0.5);
        }
      `}</style>

      {flies.map((f, i) => (
        <div
          key={i}
          className="firefly"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            animation: `
              drift ${f.duration} infinite ease-in-out,
              flash ${4 + Math.random() * 4}s infinite ease-in-out ${f.delay}
            `,
          }}
        />
      ))}
    </div>
  );
};
