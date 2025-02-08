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
    "sm:w-[7vh] sm:h-[7vh] md:w-[9vh] md:h-[9vh] lg:w-[11vh] lg:h-[11vh] xl:w-[13vh] xl:h-[13vh] 2xl:w-[15vh] 2xl:h-[15vh] rounded-full overflow-hidden flex items-center justify-center bg-white sm:border-[0.4rem] lg:border-[0.45rem] xl:border-[0.65rem]";

  const silverSponsorClass =
    "sm:w-[5vh] sm:h-[5vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white sm:border-[0.4rem] lg:border-[0.45rem] xl:border-[0.65rem]";

  const blueSponsorClass =
    "sm:w-[5vh] sm:h-[5vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white sm:border-[0.4rem] lg:border-[0.45rem] xl:border-[0.65rem]";

  const goldSubmarineAnimation = {
    animate: {
      x: ["100vw", "-100vw"],
      y: [0, -10, 0],
    },
    transition: {
      x: {
        duration: 13,
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
      x: ["100vw", "-100vw"],
      y: [0, 10, 0],
    },
    transition: {
      x: {
        duration: 18,
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
  const blueSubmarineAnimation = {
    animate: {
      x: ["100vw", "-100vw"],
      y: [0, 20, 0],
    },
    transition: {
      x: {
        duration: 23,
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
          transform: "translate(0, -50%)",
          display: "flex",
          gap: "0.5rem",
          position: "absolute",
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
    <section
      id="sponsors"
      className="sponsors-section w-full h-full overflow-hidden"
    >
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

      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative md:h-[80vh] lg:h-[90vh] w-full h-full mb-24">
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...goldSubmarineAnimation}
        >
          <div className="relative w-[961px] min-w-[360px]">
            <img src="/gold-submarine.svg" alt="Submarine" className="w-full" />
            <div className="sponsors absolute top-[67%] left-[43%] -translate-x-1/2 flex justify-around items-center w-[40%] gap-4">
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
            <BubbleTrail top="18.5em" right="2.5em" />
          </div>
        </motion.div>
      </div>
      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full h-full mb-16">
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...silverSubmarineAnimation}
        >
          <div className="relative w-[801px] min-w-[360px]">
            <img
              src="/silver-submarine.svg"
              alt="Submarine"
              className="w-full"
            />

            <div className="sponsors absolute top-[67%] left-[44%] -translate-x-1/2 flex justify-around items-center w-[30%]">
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
            <BubbleTrail top="15.5em" right="3.23em" />
          </div>
        </motion.div>
      </div>

      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full h-[290px] mb-8">
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...blueSubmarineAnimation}
        >
          <div className="relative w-[744px] min-w-[360px]">
            <img src="/blue-submarine.svg" alt="Submarine" className="w-full" />
            <div className="sponsors absolute top-[65%] left-[42%] -translate-x-1/2 flex justify-around items-center w-[40%] gap-4">
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
            <BubbleTrail top="14.5em" right="3em" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
