import earthDayImg from "../../../../assets/images/earth-day.png";
import earthNightImg from "../../../../assets/images/earth-night.png";

interface EarthProps {
  isNight: boolean;
}

export const Earth = ({ isNight }: EarthProps) => {
  return (
    <div className="absolute inset-0 flex justify-center items-center overflow-hidden bg-transparent z-10">
      <div
        className="relative flex w-full h-full items-center justify-center transition-all duration-1000"
        style={{
          transform: "scale(1.1)",
          animation: "gentleSlide 60s ease-in-out infinite alternate",
        }}
      >
        {/* Terra Lado Dia */}
        <img
          src={earthDayImg}
          alt="Earth Day"
          className="absolute w-auto h-full max-w-none transition-opacity duration-4000 ease-in-out"
          style={{
            opacity: isNight ? 0 : 1,
            zIndex: 1,
            imageRendering: "pixelated",
          }}
        />

        {/* Terra Lado Noite */}
        <img
          src={earthNightImg}
          alt="Earth Night"
          className="absolute w-auto h-full max-w-none transition-opacity duration-4000 ease-in-out"
          style={{
            opacity: isNight ? 1 : 0,
            zIndex: 2,
            imageRendering: "pixelated",
          }}
        />
      </div>

      <style>{`
        @keyframes gentleSlide {
          from { transform: scale(1.1) translateX(-3%); }
          to { transform: scale(1.1) translateX(3%); }
        }
      `}</style>
    </div>
  );
};
