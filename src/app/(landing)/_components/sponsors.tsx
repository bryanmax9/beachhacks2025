"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { dynaPuff } from "@/assets/fonts";
import { useEffect, useState } from "react";

const Sponsors = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goldSponsorClass =
    "xxxs:w-[4vh] xxxs:h-[4vh] xxs:w-[5vh] xxs:h-[5vh] xs:w-[5vh] xs:h-[5vh] sm:w-[7vh] sm:h-[7vh] md:w-[9vh] md:h-[9vh] lg:w-[11vh] lg:h-[11vh] xl:w-[13vh] xl:h-[13vh] 2xl:w-[15vh] 2xl:h-[15vh] rounded-full overflow-hidden flex items-center justify-center bg-white xxxs:border-[0.2rem] xxs:border-[0.3rem] xs:border-[0.4rem] sm:border-[0.4rem] md:border-[0.5rem] lg:border-[0.65rem]";

  const silverSponsorClass =
    "xxxs:w-[3vh] xxxs:h-[3vh] xxs:w-[4vh] xxs:h-[4vh] xs:w-[4vh] xs:h-[4vh] sm:w-[5vh] sm:h-[5vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white xxxs:border-[0.2rem] xxs:border-[0.3rem] xs:border-[0.4rem] sm:border-[0.4rem] md:border-[0.5rem] lg:border-[0.65rem]";

  const blueSponsorClass =
    "xxxs:w-[3vh] xxxs:h-[3vh] xxs:w-[4vh] xxs:h-[4vh] xs:w-[4vh] xs:h-[4vh] sm:w-[5vh] sm:h-[5vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white xxxs:border-[0.2rem] xxs:border-[0.3rem] xs:border-[0.4rem] sm:border-[0.4rem] md:border-[0.5rem] lg:border-[0.65rem]";

  const goldSubmarineAnimation = {
    animate: {
      x: ["100%", "-100%"],
      y: [0, -10, 0],
    },
    transition: {
      x: {
        duration: 20,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
      y: {
        duration: 5,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  };

  const silverSubmarineAnimation = {
    animate: {
      x: ["100%", "-100%"],
      y: [0, 10, 0],
    },
    transition: {
      x: {
        duration: 25,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
      y: {
        duration: 6,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  };
  const blueSubmarineAnimation = {
    animate: {
      x: ["100%", "-100%"],
      y: [0, 20, 0],
    },
    transition: {
      x: {
        duration: 30,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
      y: {
        duration: 7,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  };

  const bubbleVariants = {
    initial: { y: 0, x: 0, opacity: 0, scale: 0 },
    animate: {
      x: (i) => 25 + i * 10,
      y: -100,
      opacity: [0, 1, 0],
      scale: [0, 1, 1.5],
    },
  };

  const SponsorLogo = ({
    src,
    alt,
    borderColor,
    customStyle,
    sponsorClass,
  }) => {
    return (
      <motion.div
        className={cn(sponsorClass, "group")}
        style={{ borderColor }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
          style={customStyle}
        />
      </motion.div>
    );
  };

  const BubbleTrail = ({ top, right }) => {
    if (!isClient) return null;

    return (
      <motion.div
        className="bubble-container absolute pointer-events-none"
        style={{
          top: top,
          right: right,
          transform: "translateY(-50%)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            variants={bubbleVariants}
            custom={i}
            initial="initial"
            animate="animate"
            transition={{
              duration: 3,
              ease: "easeOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 2,
              delay: i * 0.2,
            }}
            style={{
              width: `${10 + Math.random() * 15}px`,
              height: `${10 + Math.random() * 15}px`,
              left: `${Math.random() * 50}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(173, 216, 230, 0.4))`,
              boxShadow: `0 0 5px rgba(255, 255, 255, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.5)`,
            }}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <section className="sponsors-section">
      <div
        className={cn(
          "sponsors-header text-center xxxs:text-1.5xl xxs:text-2xl xs:text-2.5xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-4.5xl 2xl:text-5xl font-bold drop-shadow-md",
          dynaPuff.className
        )}
      >
        <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white">
          <h2>Our Sponsors</h2>
        </div>
      </div>

      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative md:h-[80vh] lg:h-[90vh]">
        <motion.div
          className="submarine-container relative flex items-center w-full"
          {...goldSubmarineAnimation}
        >
          <img
            src="/gold-submarine-test.png"
            alt="Submarine"
            className="w-auto"
          />
          <div className="sponsors flex justify-around items-center xxxs:w-[12vh] xxs:w-[15vh] xs:w-[22vh] sm:w-[23vh] md:w-[29vh] lg:w-[34vh] xl:w-[40vh] 2xl:w-[45vh] absolute top-[55.5%] left-[33.5%] transform -translate-y-1/2">
            <a href="https://google.com/" target="_blank">
              <SponsorLogo
                src="https://loodibee.com/wp-content/uploads/Google-Logo.png"
                alt="Sponsor-1-Google"
                borderColor="#705A00"
                sponsorClass={goldSponsorClass}
              />
            </a>
            <a href="https://dain.org/" target="_blank">
              <SponsorLogo
                src="/dainai.png"
                alt="Sponsor-2-DainAI"
                borderColor="#705A00"
                customStyle={{ transform: "scale(2)" }}
                sponsorClass={goldSponsorClass}
              />
            </a>
          </div>
          <BubbleTrail top="52%" right="18%" />
        </motion.div>
      </div>
      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <motion.div
          className="submarine-container relative flex items-center w-full"
          {...silverSubmarineAnimation}
        >
          <img
            src="/silver-submarine-test.png"
            alt="Submarine"
            className="w-auto"
          />

          <div className="sponsors flex justify-around items-center xxxs:w-[18vh] xxs:w-[22vh] xs:w-[30vh] sm:w-[35vh] md:w-[40vh] lg:w-[50vh] xl:w-[60vh] 2xl:w-[68vh] absolute top-[57.5%] left-[28%] transform -translate-y-1/2">
            <a href="https://www.codeandcoffee.dev/" target="_blank">
              <SponsorLogo
                src="/code-and-coffee.svg"
                alt="Sponsor-3-code-and-coffee"
                borderColor="#777777"
                customStyle={{ transform: "scale(0.87)" }}
                sponsorClass={silverSponsorClass}
              />
            </a>
          </div>
          <BubbleTrail top="55%" right="24%" />
        </motion.div>
      </div>

      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <motion.div
          className="submarine-container relative flex items-center w-full"
          {...blueSubmarineAnimation}
        >
          <img src="/blue-submarine.png" alt="Submarine" className="w-auto" />
          <div className="sponsors flex justify-around items-center xxxs:w-[8vh] xxs:w-[12vh] xs:w-[20vh] sm:w-[25vh] md:w-[30vh] lg:w-[35vh] xl:w-[40vh] 2xl:w-[45vh] absolute top-[55.5%] left-[33%] transform -translate-y-1/2">
            <a
              href="https://balsamiq.com/?gad_source=1&gclid=CjwKCAiA74G9BhAEEiwA8kNfpVWbLV0lGKPMG9zPEz4gXWk22PcAEhz-Q7A3fwhNBavZ_eBRoNHfMhoClUEQAvD_BwE"
              target="_blank"
            >
              <SponsorLogo
                src="/balsamiq-1690452164916-2x.png"
                alt="Sponsor-4-balsamiq"
                borderColor="#5D7FA3"
                sponsorClass={blueSponsorClass}
              />
            </a>
            <a href="https://www.interviewcake.com/" target="_blank">
              <SponsorLogo
                src="/cake_logo_blue_gray.svg"
                alt="Sponsor-5-interview-cake"
                borderColor="#5D7FA3"
                sponsorClass={blueSponsorClass}
              />
            </a>
          </div>
          <BubbleTrail top="52.5%" right="28%" />
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
