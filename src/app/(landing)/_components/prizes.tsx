"use client";
import red_fish from "../../../../public/redfish.png";
import star_fish from "../../../../public/starfish.png";
import "./prizes.css";
import Image from "next/image";
import { motion } from "framer-motion";

// FloatingFish component generates random animation parameters
function FloatingFish({ src, alt, className }) {
  // Random horizontal and vertical offset amplitudes
  const randomX = Math.random() * 20 - 10; // between -10 and 10
  const randomY = Math.random() * 20 - 10;
  // Random animation duration between 4 and 8 seconds
  const duration = Math.random() * 4 + 4;
  return (
    <motion.div
      className={className}
      animate={{
        x: [0, randomX, 0],
        y: [0, randomY, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <Image src={src} alt={alt} layout="fill" objectFit="fill" />
    </motion.div>
  );
}

export default function Prizes() {
  return (
    <div
      id="prizes"
      className="relative flex items-center flex-col justify-center align-middle w-full h-[70vh]"
    >
      <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-blue-900 bg-white bg-opacity-90 p-2 shadow-xl rounded-xl w-fit">
        Prizes (Coming soon!)
      </h2>
      {/* Floating Fish Decorations */}
      <FloatingFish
        src={star_fish}
        alt="star_fish"
        className="md:w-32 w-24 md:h-32 h-24 absolute z-10 bottom-4 md:left-10 left-5"
      />
      <FloatingFish
        src={red_fish}
        alt="red_fish"
        className="md:w-32 w-24 md:h-32 h-24 absolute z-10 md:top-10 top-80 md:right-10 right-4"
      />
      <div className="flex flex-wrap md:px-28 align-middle items-center justify-center md:flex-row flex-col md:gap-x-14 gap-y-5 mt-5">
        {/* Additional content can be placed here */}
      </div>
    </div>
  );
}
