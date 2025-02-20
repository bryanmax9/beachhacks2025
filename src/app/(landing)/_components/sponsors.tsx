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
    "xs:w-[7vh] xs:h-[7vh] sm:w-[8vh] sm:h-[8vh] md:w-[9vh] md:h-[9vh] lg:w-[11vh] lg:h-[11vh] xl:w-[13vh] xl:h-[13vh] 1.5xl:w-[14vh] 1.5xl:h-[14vh] 2xl:w-[15vh] 2xl:h-[15vh] rounded-full overflow-hidden flex items-center justify-center bg-white xs:border-[0.4rem] lg:border-[0.45rem] xl:border-[0.65rem]";

  const smallGoldSponsorClass =
    "xs:w-[6vh] xs:h-[6vh] sm:w-[7vh] sm:h-[7vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 1.5xl:w-[13vh] 1.5xl:h-[13vh] 2xl:w-[15vh] 2xl:h-[15vh] rounded-full overflow-hidden flex items-center justify-center bg-white xs:border-[0.4rem] lg:border-[0.45rem] xl:border-[0.65rem]";

  const genericSponsorClass =
    "xs:w-[7vh] xs:h-[7vh] sm:w-[8vh] sm:h-[8vh] md:w-[9vh] md:h-[9vh] lg:w-[11vh] lg:h-[11vh] xl:w-[12vh] xl:h-[12vh] 1.5xl:w-[13vh] 1.5xl:h-[13vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white xs:border-[0.4rem] lg:border-[0.45rem] xl:border-[0.65rem]";

  const goldSubmarineAnimation = {
    animate: {
      x: ["100vw", "-190vw"],
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
        duration: 14,
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
        duration: 15,
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
    initial: { y: 0, opacity: 0, scale: 0 },
    animate: {
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
          draggable="false"
        />
      </motion.div>
    );
  };

  const BubbleTrail = ({ top, right }) => {
    if (!isClient) return null;

    return (
      <div className="absolute" style={{ top, right, zIndex: 1 }}>
        <motion.div
          className="relative"
          style={{
            width: "100px",
            height: "200px",
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
                width: `${Math.max(
                  6,
                  Math.min(10 + Math.random() * 15, 15)
                )}px`,
                height: `${Math.max(
                  6,
                  Math.min(10 + Math.random() * 15, 15)
                )}px`,
                left: `${i * 5 + Math.random() * 5}px`, // More controlled horizontal spread
                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(173, 216, 230, 0.4))`,
                boxShadow: `0 0 5px rgba(255, 255, 255, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.5)`,
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section
      id="sponsors"
      className="sponsors-section w-full h-full overflow-hidden"
    >
      <div
        className={cn(
          "sponsors-header text-center sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-4.5xl 2xl:text-5xl font-bold drop-shadow-md",
          dynaPuff.className
        )}
      >
        <h2 className="tracks-heading text-5xl font-bold text-center mb-12 text-gray-800">
          Sponsors
        </h2>
      </div>

      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[90vh] w-full mb-24">
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...goldSubmarineAnimation}
        >
          <div className="relative w-[961px] min-w-[360px]">
            <div className="relative">
              <BubbleTrail top="68%" right="-5%" />
              <img
                src="/gold-submarine.svg"
                alt="Submarine"
                className="w-full z-[5] relative"
                draggable="false"
              />
              <div className="sponsors absolute top-[67%] left-[43%] -translate-x-1/2 flex justify-around items-center w-[40%] gap-4 z-[5]">
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

              <div className="absolute w-[80%] -right-[90%] top-[13%] z-[2]">
                <img
                  src="/chain.png"
                  alt="Connecting Chain"
                  className="absolute -left-[17%] top-[70%] w-[25%] h-auto opacity-90 transform scale-y-[-1] z-[2]"
                  draggable="false"
                />
                <BubbleTrail top="68%" right="-6%" />
                <img
                  src="/small-gold-sub.svg"
                  alt="Small Gold Submarine"
                  className="w-full relative z-[3]"
                  draggable="false"
                />
                <div className="sponsors absolute top-[64%] left-[44%] -translate-x-1/2 flex justify-around items-center w-[30%] z-[4]">
                  <a href="https://www.asicsulb.org/corporate/" target="_blank">
                    <SponsorLogo
                      src="/asi-logo.png"
                      alt="Sponsor-ASI"
                      borderColor="#705A00"
                      sponsorClass={smallGoldSponsorClass}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Silver submarine section */}
      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[75vh] w-full mb-24">
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...silverSubmarineAnimation}
        >
          <div className="relative w-[801px] min-w-[360px]">
            <div className="relative">
              <BubbleTrail top="68%" right="-5%" />
              <img
                src="/silver-submarine.svg"
                alt="Submarine"
                className="w-full z-[2] relative"
                draggable="false"
              />
              <div className="sponsors absolute top-[67%] left-[43%] -translate-x-1/2 flex justify-around items-center w-[47%] gap-4 z-[3]">
                <a href="https://www.codeandcoffee.dev/" target="_blank">
                  <SponsorLogo
                    src="/code-and-coffee.svg"
                    alt="Sponsor-3-code-and-coffee"
                    borderColor="#777777"
                    customStyle={{ transform: "scale(0.87)" }}
                    sponsorClass={genericSponsorClass}
                  />
                </a>
                <a href="https://www.codepath.org/" target="_blank">
                  <SponsorLogo
                    src="/code_path_logo.png"
                    alt="Sponsor-4-codepath"
                    borderColor="#777777"
                    sponsorClass={genericSponsorClass}
                  />
                </a>
                <a href="https://www.patientsafetytech.com/" target="_blank">
                  <SponsorLogo
                    src="/PSTC-Logo.png"
                    alt="Sponsor-5-pstc"
                    borderColor="#777777"
                    customStyle={{ transform: "scale(1.25)" }}
                    sponsorClass={genericSponsorClass}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blue submarine section */}
      <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[75vh] w-full mb-16">
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...blueSubmarineAnimation}
        >
          <div className="relative w-[744px] min-w-[360px]">
            <div className="relative">
              <BubbleTrail top="68%" right="-5%" />
              <img
                src="/blue-submarine.svg"
                alt="Submarine"
                className="w-full z-[2] relative"
                draggable="false"
              />
              <div className="sponsors absolute top-[65%] left-[40%] -translate-x-1/2 flex justify-around items-center w-[49%] gap-4.5 z-[3]">
                <a
                  href="https://balsamiq.com/?gad_source=1&gclid=CjwKCAiA74G9BhAEEiwA8kNfpVWbLV0lGKPMG9zPEz4gXWk22PcAEhz-Q7A3fwhNBavZ_eBRoNHfMhoClUEQAvD_BwE"
                  target="_blank"
                >
                  <SponsorLogo
                    src="/balsamiq-1690452164916-2x.png"
                    alt="Sponsor-6-balsamiq"
                    borderColor="#5D7FA3"
                    customStyle={{ transform: "scale(1.2)" }}
                    sponsorClass={genericSponsorClass}
                  />
                </a>
                <a href="https://www.interviewcake.com/" target="_blank">
                  <SponsorLogo
                    src="/cake_logo_blue_gray.svg"
                    alt="Sponsor-7-interview-cake"
                    borderColor="#5D7FA3"
                    sponsorClass={genericSponsorClass}
                  />
                </a>
                <a href="https://github.com/" target="_blank">
                  <SponsorLogo
                    src="/github-logo.png"
                    alt="Sponsor-8-github"
                    borderColor="#5D7FA3"
                    customStyle={{ transform: "scale(0.87)" }}
                    sponsorClass={genericSponsorClass}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
