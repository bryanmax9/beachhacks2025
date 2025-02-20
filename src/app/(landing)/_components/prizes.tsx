"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import red_fish from "../../../../public/redfish.png";
import star_fish from "../../../../public/starfish.png";
import "./prizes.css"; // Plain CSS file
import { cn } from "@/lib/utils";
import { dynaPuff } from "@/assets/fonts";

// FloatingFish component for decorative animations
function FloatingFish({
  src,
  alt,
  className,
}: {
  src: any;
  alt: string;
  className?: string;
}) {
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
        duration: duration,
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
          Prizes(Coming Zoon)
        </h2>
      </div>

      {/* Floating Fish Decorations */}
      <FloatingFish
        src={star_fish}
        alt="star_fish"
        className="absolute z-10 bottom-4 md:left-10 left-5 w-24 h-24 md:w-32 md:h-32"
      />
      <FloatingFish
        src={red_fish}
        alt="red_fish"
        className="absolute z-10 md:top-10 top-80 md:right-10 right-4 w-24 h-24 md:w-32 md:h-32"
      />

      <div className="cardsContainer">
        {/* Card 1 */}
        <div className="flipCard">
          <div className="flipCardInner">
            {/* FRONT */}
            <div className="flipCardFront">
              <Image
                src="/craby.png" /* Replace with your front image */
                alt="Rock Icon"
                width={100}
                height={100}
                className="cardImage"
              />
              <h3>Beginner Track</h3>
            </div>
            {/* BACK */}
            <div className="flipCardBack">
              <Image
                src="/question.png" /* Replace with your prize image */
                alt="Clean Code Prize"
                width={120}
                height={120}
                className="cardImage"
              />
              <p>Win this by focusing on writing high-quality code!</p>
              <p>Criteria: Best code structure, clarity, etc.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <Image
                src="/dainBanner.png"
                alt="Rock Icon"
                width={400}
                height={100}
                className="cardImage"
              />
              <h3>DAIN AI</h3>
            </div>
            <div className="flipCardBack">
              <Image
                src="/question.png"
                alt="Hack2School Prize"
                width={120}
                height={120}
                className="cardImage"
              />
              <p>TBD</p>
              <p>Criteria: TBD</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <Image
                src="/logo.png"
                alt="Rock Icon"
                width={100}
                height={100}
                className="cardImage"
              />
              <h3>BeachHacks</h3>
            </div>
            <div className="flipCardBack">
              <Image
                src="/winnerACM.jpg"
                alt="Cold Hard Cache Prize"
                width={120}
                height={120}
                className="cardImage"
              />
              <p>For the best project Overall On the Hackaton🦭</p>
              <p>Criteria: Must use caching, DB indexing, etc.</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flipCard">
          <div className="flipCardInner">
            <div className="flipCardFront">
              <Image
                src="/patient.png"
                alt="Rock Icon"
                width={300}
                height={100}
                className="cardImage"
              />
              <h3>Heart of the Matter</h3>
            </div>
            <div className="flipCardBack">
              <Image
                src="/question.png"
                alt="Heart of the Matter Prize"
                width={120}
                height={120}
                className="cardImage"
              />
              <p>TBD</p>
              <p>Criteria: TBD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
