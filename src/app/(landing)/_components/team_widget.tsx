import Image from "next/image";
import seashell from "../../../../public/seashell.png"
import { useState, useEffect, useRef } from "react";

interface TeamWidgetProps {
  name: string;
  role: string;
  image: string;
}

const getRandomValue = (max: number): number => {
  return Math.floor(Math.random()*max);
}

export default function TeamWidget({ name, role, image }: TeamWidgetProps) {
  const containerRef = useRef<HTMLDivElement|null>(null); //we need ref to directly access jsx element
  const [height, setHeight] = useState<number>(0);
  const [randomHeight, setRandomHeight] = useState<number>(0);
  const [randomHeight2, setRandomHeight2] = useState<number>(0);
  useEffect(()=>{
    if(containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  },[])
  useEffect(()=>{
    setRandomHeight(getRandomValue(height-75));
    setRandomHeight2(getRandomValue(height-75));
  },[height])
  return (
      <div ref={containerRef}  className="relative flex flex-col items-center bg-[#d1a564] text-center rounded-lg shadow-lg p-4 w-48 md:w-56 lg:w-64 transition-transform transform hover:scale-105">
      {/* Name */}
      <p className="text-lg font-bold text-blue-900 mb-2">{name}</p>

      {/* sea shells */}
      <Image
        src={seashell}
        alt="seashell"
        width={50}
        height={50}
        style={{ bottom: `${randomHeight}px`, transform: `rotate(${randomHeight}deg)` }}
        className={`absolute  left-0 opacity-60`}
      />

      <Image
        src={seashell}
        alt="seashell"
        width={50}
        height={50}
        style={{ bottom: `${randomHeight2}px`, transform: `rotate(${randomHeight2}deg)`}}
        className={`absolute  right-0 opacity-60`}
      />
      {/* Image */}
      <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-yellow-500 flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          width={120}
          height={120}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Role */}
      <p className="text-sm text-black-600 italic mt-2">{role}</p>
    </div>
  );
}
