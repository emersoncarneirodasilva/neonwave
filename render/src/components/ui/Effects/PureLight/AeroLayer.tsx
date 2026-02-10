import React, { useState, useCallback, useRef } from "react";

import whiteAirplaneImg from "../../../../assets/images/white-airplane.png";
import whiteAirplane02Img from "../../../../assets/images/white-airplane-02.png";
import grayAirplane02Img from "../../../../assets/images/gray-airplane.png";
import helicopterImg from "../../../../assets/images/helicopter.png";
import alienShipImg from "../../../../assets/images/alien-ship.png";

interface AeroLayerProps {
  hour: number;
}

export const AeroLayer: React.FC<AeroLayerProps> = ({ hour }) => {
  const isNight = hour < 5 || hour >= 19;
  const hourRef = useRef(hour);
  hourRef.current = hour;

  const generateRoute = useCallback(() => {
    const currentHour = hourRef.current;
    const isAlienHour = currentHour >= 3 && currentHour < 4;
    const goesRight = Math.random() > 0.5;
    const isNear = Math.random() > 0.6;

    const normalVehicles = [
      whiteAirplaneImg,
      whiteAirplane02Img,
      grayAirplane02Img,
      helicopterImg,
    ];
    let selectedImg =
      normalVehicles[Math.floor(Math.random() * normalVehicles.length)];

    if (isAlienHour && Math.random() > 0.7) selectedImg = alienShipImg;

    const isHeli = selectedImg === helicopterImg;
    const isAlien = selectedImg === alienShipImg;

    return {
      id: Math.random().toString(36).substr(2, 9),
      img: selectedImg,
      isHeli,
      isAlien,
      direction: goesRight ? "ltr" : "rtl",
      startX: goesRight ? "-30vw" : "130vw",
      endX: goesRight ? "130vw" : "-30vw",
      top: isAlien ? "15%" : `${10 + Math.random() * 25}%`,
      speed: isAlien ? 15 : isHeli ? (isNear ? 50 : 80) : isNear ? 30 : 60,
      scale: isNear ? 0.5 : 0.3,
      opacity: isNear ? 1 : 0.6,
    };
  }, []);

  const [route, setRoute] = useState(generateRoute);

  const nextFlight = useCallback(() => {
    setRoute(generateRoute());
  }, [generateRoute]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      <style>{`
        @keyframes fly-cycle {
          from { left: ${route.startX}; }
          to { left: ${route.endX}; }
        }
        .aero-plane-container {
          position: absolute;
          top: ${route.top};
          left: ${route.startX};
          animation: fly-cycle ${route.speed}s linear forwards;
          will-change: left;
        }
        .strobe-fast { animation: strobe-blink 1.2s steps(1, end) infinite; }
        
        /* Nova animação colorida para a nave */
        @keyframes alien-rainbow {
          0% { background-color: #ff0000; box-shadow: 0 0 8px #ff0000; }
          33% { background-color: #00ff00; box-shadow: 0 0 8px #00ff00; }
          66% { background-color: #0000ff; box-shadow: 0 0 8px #0000ff; }
          100% { background-color: #ff0000; box-shadow: 0 0 8px #ff0000; }
        }
        .alien-light {
          animation: alien-rainbow 0.6s linear infinite;
        }

        @keyframes strobe-blink { 0%, 80% { opacity: 0; } 90% { opacity: 1; } }
      `}</style>

      <div
        key={route.id}
        className="aero-plane-container"
        onAnimationEnd={nextFlight}
        style={{
          opacity: route.opacity,
          transform: `scale(${route.scale})`,
        }}
      >
        <div className="relative flex items-center justify-center">
          <img
            src={route.img}
            alt="air-vehicle"
            style={{
              width: "50px",
              imageRendering: "pixelated",
              transform: route.direction === "rtl" ? "scaleX(-1)" : "none",
              filter: !isNight
                ? "none"
                : route.isAlien
                  ? "brightness(0.6) contrast(1.2)"
                  : "brightness(0.1) saturate(0) contrast(1.5)",
            }}
          />

          {isNight && (
            <div className="absolute inset-0 w-full h-full flex items-end justify-center gap-2 pb-1">
              {route.isAlien ? (
                <>
                  {/* Três luzes que mudam de cor em tempos diferentes */}
                  <div className="alien-light w-1.5 h-1.5 rounded-full" />
                  <div
                    className="alien-light w-1.5 h-1.5 rounded-full"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="alien-light w-1.5 h-1.5 rounded-full"
                    style={{ animationDelay: "0.4s" }}
                  />
                </>
              ) : (
                <div className="absolute inset-0">
                  <div
                    className="strobe-fast absolute w-1 h-1 bg-white shadow-[0_0_4px_white]"
                    style={{
                      left: route.direction === "ltr" ? "0px" : "45px",
                      top: route.isHeli ? "40%" : "50%",
                    }}
                  />
                  <div
                    className="absolute w-0.5 h-0.5 bg-red-600 shadow-[0_0_3px_red]"
                    style={{
                      right: route.direction === "ltr" ? "15px" : "auto",
                      left: route.direction === "rtl" ? "15px" : "auto",
                      top: "60%",
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
