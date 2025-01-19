"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { dynaPuff } from "@/assets/fonts";

const Sponsors = () => {
  const goldSponsorClass =
    "xxxs:w-[3vh] xxxs:h-[3vh] xxs:w-[4vh] xxs:h-[4vh] xs:w-[4vh] xs:h-[4vh] sm:w-[5vh] sm:h-[5vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white xxxs:border-[0.2rem] xxs:border-[0.3rem] xs:border-[0.4rem] sm:border-[0.4rem] md:border-[0.5rem] lg:border-[0.65rem]";

  const silverSponsorClass =
    "xxxs:w-[3vh] xxxs:h-[3vh] xxs:w-[4vh] xxs:h-[4vh] xs:w-[4vh] xs:h-[4vh] sm:w-[5vh] sm:h-[5vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white xxxs:border-[0.2rem] xxs:border-[0.3rem] xs:border-[0.4rem] sm:border-[0.4rem] md:border-[0.5rem] lg:border-[0.65rem]";

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

  const silverSubmarineAnimation = {
    animate: {
      x: ["100%", "-100%"],
    },
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
      delay: 5,
    },
  };

  const bubbleVariants = {
    initial: { y: 0, x: 0, opacity: 1 },
    animate: {
      x: 50,
      y: -150,
      opacity: 0,
      scale: 2,
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
          <img src="/gold-submarine.svg" alt="Submarine" className="w-auto" />

          <div className="sponsors flex justify-around items-center xxxs:w-[12vh] xxs:w-[15vh] xs:w-[22vh] sm:w-[23vh] md:w-[29vh] lg:w-[34vh] xl:w-[40vh] 2xl:w-[45vh] absolute top-[55.5%] left-[33.5%] transform -translate-y-1/2">
            <div
              className={goldSponsorClass}
              style={{
                borderColor: "#705A00",
              }}
            >
              <img
                src="https://loodibee.com/wp-content/uploads/Google-Logo.png"
                alt="Sponsor-1-Google"
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className={goldSponsorClass}
              style={{
                borderColor: "#705A00",
              }}
            >
              <img
                src="/dainai.png"
                alt="Sponsor-2-DainAI"
                className="w-full h-full object-contain"
                style={{ transform: "scale(2)" }}
              />
            </div>
          </div>

          {/* Bubble Trail */}
          <motion.div
            className="bubble-container absolute pointer-events-none"
            style={{
              top: "51%",
              right: "27%",
              transform: "translateY(-50%)",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-blue-300 rounded-full"
                variants={bubbleVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 5,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  delay: i * 0.5,
                }}
                style={{
                  width: `${50}px`,
                  height: `${50}px`,
                  left: `${Math.random() * 50}px`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative xxxs:h-[20vh] xxs:h-[25vh] xs:h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] 2xl:h-[80vh]">
        <motion.div
          className="submarine-container relative flex items-center"
          {...silverSubmarineAnimation}
          style={{}} // Position under the gold submarine
        >
          <img src="/silver-submarine.svg" alt="Submarine" className="w-auto" />

          <div className="sponsors flex justify-around items-center xxxs:w-[18vh] xxs:w-[22vh] xs:w-[30vh] sm:w-[35vh] md:w-[40vh] lg:w-[50vh] xl:w-[60vh] 2xl:w-[68vh] absolute top-[55.5%] left-[27%] transform -translate-y-1/2">
            <div
              className={silverSponsorClass}
              style={{
                borderColor: "#777777",
              }}
            >
              <img
                src="/code-and-coffee.svg"
                alt="Sponsor-3-code-and-coffee"
                className="w-full h-full object-contain"
                style={{ transform: "scale(0.85)" }}
              />
            </div>
            {/* 
            <div
              className={sponsorClass}
              style={{
                borderColor: "#BEBEBE",
              }}
            >
              <img
                src="/wolfram.png"
                alt="Sponsor-4-Wolfram"
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
                alt="Sponsor-5-Balsamiq"
                className="w-full h-full object-contain"
              />
            </div>
            */}
          </div>
          {/* Bubble Trail */}
          <motion.div
            className="bubble-container absolute pointer-events-none"
            style={{
              top: "51%",
              right: "27%",
              transform: "translateY(-50%)",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-blue-300 rounded-full"
                variants={bubbleVariants}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 5,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  delay: i * 0.3,
                }}
                style={{
                  width: `${50}px`,
                  height: `${50}px`,
                  left: `${Math.random() * 50}px`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
