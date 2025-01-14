"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { dynaPuff } from "@/assets/fonts";

const Sponsors = () => {
  const sponsorClass =
    "xxxs:w-[3vh] xxxs:h-[3vh] xxs:w-[4vh] xxs:h-[4vh] xs:w-[4vh] xs:h-[4vh] sm:w-[6vh] sm:h-[6vh] md:w-[8vh] md:h-[8vh] lg:w-[10vh] lg:h-[10vh] xl:w-[12vh] xl:h-[12vh] 2xl:w-[14vh] 2xl:h-[14vh] rounded-full overflow-hidden flex items-center justify-center bg-white sm:border-[0.4rem] md:border-[0.5rem] lg:border-[0.65rem]";

  const submarineAnimation = {
    animate: {
      x: ["100%", "-100%"],
    },
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    },
  };

  return (
    <section className="sponsors-section">
      <div
        className={cn(
          "sponsors-header text-center xxxs:text-1.5xl xxs:text-2xl xs:text-2.5xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-4.5xl 2xl:text-5xl font-bold drop-shadow-md",
          dynaPuff.className
        )}
      >
        <div className="inline-block px-6 py-2 bg-white/15 backdrop-blur-md rounded-full">
          <h2>Our Sponsors</h2>
        </div>
      </div>

      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative xxxs:h-[20vh] xxs:h-[25vh] xs:h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[80vh]">
        <motion.div
          className="submarine-container relative flex items-center"
          {...submarineAnimation}
        >
          <img
            src="https://i.imgur.com/QBqZrF8.png"
            alt="Submarine"
            className="w-auto"
          />

          <div className="sponsors flex justify-around items-center xxxs:w-[18vh] xxs:w-[22vh] xs:w-[30vh] sm:w-[35vh] md:w-[40vh] lg:w-[50vh] xl:w-[60vh] 2xl:w-[68vh] absolute top-[56%] left-[25%] transform -translate-y-1/2">
            <div
              className={sponsorClass}
              style={{
                borderColor: "#BEBEBE",
              }}
            >
              <img
                src="https://loodibee.com/wp-content/uploads/Google-Logo.png"
                alt="Sponsor-1-Google"
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={sponsorClass}
              style={{
                borderColor: "#BEBEBE",
              }}
            >
              <img
                src="https://i.imgur.com/C9ZOPur.png"
                alt="Sponsor-2-Wolfram"
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={sponsorClass}
              style={{
                borderColor: "#BEBEBE",
              }}
            >
              <img
                src="https://img.uxcel.com/tags/balsamiq-1690452164916-2x.jpg"
                alt="Sponsor-3-Balsamiq"
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={sponsorClass}
              style={{
                borderColor: "#BEBEBE",
              }}
            >
              <img
                src="https://i.imgur.com/CIZvFIn.png"
                alt="Sponsor-4-DainAI"
                className="w-full h-full object-contain"
                style={{ transform: "scale(2)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
