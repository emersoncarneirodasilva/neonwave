import { useEffect, useState } from "react";

import { OceanAbyssScene } from "../ui/Effects/OceanAbyss/OceanAbyssScene";
import { Bubbles } from "../ui/Effects/OceanAbyss/Bubbles";
import { OceanHUD } from "../ui/Effects/OceanAbyss/OceanHUD";
import { SonarRadar } from "../ui/Effects/OceanAbyss/SonarRadar";
import { TabletLights } from "../ui/Effects/OceanAbyss/TabletLights";
import { WhaleEvent } from "../ui/Effects/OceanAbyss/WhaleEvent";
import { SharkEvent } from "../ui/Effects/OceanAbyss/SharkEvent";
import { FishSwarm } from "../ui/Effects/OceanAbyss/FishSwarm";
import { SoloFish } from "../ui/Effects/OceanAbyss/SoloFish";
import { Jellyfish } from "../ui/Effects/OceanAbyss/Jellyfish";

import fish01Img from "../../assets/images/fish-01.png";
import fish02Img from "../../assets/images/fish-02.png";
import fish03Img from "../../assets/images/fish-03.png";
import fish04Img from "../../assets/images/fish-04.png";
import fish05Img from "../../assets/images/fish-05.png";
import fish06Img from "../../assets/images/fish-06.png";
import fish07Img from "../../assets/images/fish-07.png";

export function OceanAbyss() {
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const isNight = hour >= 18 || hour < 5;

  return (
    <>
      <OceanAbyssScene isNight={isNight} />;
      <FishSwarm fishImage={fish01Img} isNight={isNight} />
      <FishSwarm fishImage={fish05Img} isNight={isNight} />
      <FishSwarm fishImage={fish06Img} isNight={isNight} />
      <FishSwarm fishImage={fish07Img} isNight={isNight} />
      <SoloFish fishImage={fish02Img} isNight={isNight} />
      <SoloFish fishImage={fish03Img} isNight={isNight} />
      <SoloFish fishImage={fish04Img} isNight={isNight} />
      <Jellyfish isNight={isNight} type={1} />
      <Jellyfish isNight={isNight} type={2} />
      <Bubbles isNight={isNight} />
      <WhaleEvent isNight={isNight} />
      <SharkEvent isNight={isNight} />
      <OceanHUD isNight={isNight} />
      <SonarRadar isNight={isNight} />
      <TabletLights isNight={isNight} />
    </>
  );
}
