"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import redFish from "../../../../public/redfish.png";
import starFish from "../../../../public/starfish.png";
import "./prizes.css";
import { cn } from "@/lib/utils";
import { dynaPuff } from "@/assets/fonts";

interface FloatingFishProps {
  src: any; // Optionally replace with StaticImageData if available
  alt: string;
  className?: string;
}

// FloatingFish component for decorative animations
function FloatingFish({ src, alt, className }: FloatingFishProps) {
  const randomX = Math.random() * 20 - 10; // between -10 and 10
  const randomY = Math.random() * 20 - 10;
  const duration = Math.random() * 4 + 4; // between 4 and 8 seconds

  return (
    <motion.div
      className={className}
      animate={{
        x: [0, randomX, 0],
        y: [0, randomY, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} />
    </motion.div>
  );
}

export default function Prizes() {
  return (
    <div id="prizes" className="prizesSection relative">
      <div
        className={cn(
          "sponsors-header text-center sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-4.5xl 2xl:text-5xl font-bold drop-shadow-md",
          dynaPuff.className
        )}
      >
        <h2 className="tracks-heading text-5xl font-bold text-center mb-12 text-gray-800">
          Prizes
        </h2>
      </div>

      {/* Floating Fish Decorations */}
      <FloatingFish
        src={starFish}
        alt="Star Fish"
        className="absolute z-10 bottom-4 md:left-10 left-5 w-24 h-24 md:w-32 md:h-32"
      />
      <FloatingFish
        src={redFish}
        alt="Red Fish"
        className="absolute z-[-1] md:top-10 top-80 md:right-10 right-4 w-24 h-24 md:w-32 md:h-32"
      />

      <div className="cardsContainer">
        {/* Card for DAIN AI */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <Image
                src="/dainBanner.png"
                alt="DAIN AI Banner"
                width={400}
                height={100}
                className="cardImage"
              />
              <h3>DAIN AI</h3>
            </div>
            <div className="flipCardBack">
              <Image
                src="/giftcard.png"
                alt="DAIN AI Prize"
                width={120}
                height={120}
                className="cardImage"
              />
              <p>1st Place: $1,000</p>
              <p>2nd Place: $500</p>
              <p>3rd Place: $250</p>
            </div>
          </div>
        </div>

        {/* Card for BeachHacks */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <Image
                src="/logo.png"
                alt="BeachHacks Logo"
                width={100}
                height={100}
                className="cardImage"
              />
              <h3>BeachHacks</h3>
            </div>
            <div className="flipCardBack">
              <Image
                src="/switchmonitor.png"
                alt="BeachHacks Prize"
                width={120}
                height={120}
                className="cardImage"
              />
              <p>Best Overall: Nintendo Switch</p>
              <p>2nd Best Overall: Monitor</p>
            </div>
          </div>
        </div>

        {/* Card for Patient Safety (Heart of the Matter) */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <Image
                src="/patient.png"
                alt="Patient Safety Icon"
                width={250}
                height={100}
                className="cardImage"
              />
              <h3>Heart of the Matter</h3>
            </div>
            <div className="flipCardBack">
              <Image
                src="/giftcard.png"
                alt="Patient Safety Prize"
                width={120}
                height={120}
                className="cardImage"
              />
              <p>$185 gift card for each hacker in the winning team</p>
            </div>
          </div>
        </div>

        {/* Card for Boot.Dev */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <Image
                src="/bootlogo.png"
                alt="Boot.dev Logo"
                width={200}
                height={200}
                className="cardImage mt-4"
              />
              <h3>Boot.dev</h3>
            </div>
            <div className="flipCardBack">
              <Image
                src="/bootsub.png"
                alt="Boot.dev Prize"
                width={120}
                height={120}
                className="cardImage"
              />
              <p>Best Beginner Prize: 1 year of Boot.dev subscription</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
