"use client";

import { cn } from "@/lib/utils";
import { color, motion } from "framer-motion";
import { dynaPuff } from "@/assets/fonts";
import { useEffect, useState, useRef } from "react";

// Helper to determine a simple breakpoint from window width.
const getBreakpoint = (width) => {
  if (width < 640) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  if (width < 1920) return "1.5xl";
  return "2xl";
};

const Sponsors = () => {
  const [isClient, setIsClient] = useState(false);
  const [breakpoint, setBreakpoint] = useState("xs");

  // Create refs for each submarine container.
  const goldContainerRef = useRef(null);
  const silverContainerRef = useRef(null);
  const blueContainerRef = useRef(null);

  // State for container heights.
  const [goldHeight, setGoldHeight] = useState(0);
  const [silverHeight, setSilverHeight] = useState(0);
  const [blueHeight, setBlueHeight] = useState(0);

  // Update breakpoint and container heights on mount and resize.
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setBreakpoint(getBreakpoint(window.innerWidth));
      const updateContainerHeights = () => {
        if (goldContainerRef.current) {
          setGoldHeight(goldContainerRef.current.clientHeight);
        }
        if (silverContainerRef.current) {
          setSilverHeight(silverContainerRef.current.clientHeight);
        }
        if (blueContainerRef.current) {
          setBlueHeight(blueContainerRef.current.clientHeight);
        }
      };

      const handleResize = () => {
        const newBp = getBreakpoint(window.innerWidth);
        if (newBp !== breakpoint) {
          setBreakpoint(newBp);
        }
        updateContainerHeights();
      };

      updateContainerHeights();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [breakpoint]);

  // Multipliers relative to container height (instead of viewport height).
  const goldSizes = {
    xs: 0.11,
    sm: 0.11,
    md: 0.11,
    lg: 0.11,
    xl: 0.11,
    "1.5xl": 0.11,
    "2xl": 0.11,
  };

  const smallGoldSizes = {
    xs: 0.09,
    sm: 0.09,
    md: 0.09,
    lg: 0.09,
    xl: 0.09,
    "1.5xl": 0.09,
    "2xl": 0.09,
  };

  const genericSizes = {
    xs: 0.15,
    sm: 0.15,
    md: 0.15,
    lg: 0.15,
    xl: 0.15,
    "1.5xl": 0.15,
    "2xl": 0.15,
  };

  const silverSizes = {
    xs: 0.1,
    sm: 0.1,
    md: 0.1,
    lg: 0.1,
    xl: 0.1,
    "1.5xl": 0.1,
    "2xl": 0.1,
  };

  // Compute a fixed pixel size based on a container's height.
  const computeSize = (containerHeight, sizesMapping) => {
    if (!containerHeight) return 0;
    return containerHeight * sizesMapping[breakpoint];
  };

  // Computed sizes for sponsor logos based on their respective container heights.
  const goldSponsorSize = computeSize(goldHeight, goldSizes);
  const smallGoldSponsorSize = computeSize(goldHeight, smallGoldSizes);
  const silverSponsorSize = computeSize(silverHeight, silverSizes);
  const genericSponsorSize = computeSize(blueHeight, genericSizes);

  // Define border widths mapping (using rem values) per breakpoint.
  const borderWidths = {
    xs: "0.4rem",
    sm: "0.4rem",
    md: "0.4rem",
    lg: "0.45rem",
    xl: "0.65rem",
    "1.5xl": "0.65rem",
    "2xl": "0.65rem",
  };

  // Motion animations for submarines (unchanged).
  const goldSubmarineAnimation = {
    animate: {
      x: ["100vw", "-190vw"],
      y: [0, -10, 0],
    },
    transition: {
      x: { duration: 25, ease: "linear", repeat: Number.POSITIVE_INFINITY },
      y: { duration: 5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
    },
  };

  const silverSubmarineAnimation = {
    animate: {
      x: ["100vw", "-100vw"],
      y: [0, 10, 0],
    },
    transition: {
      x: { duration: 22, ease: "linear", repeat: Number.POSITIVE_INFINITY },
      y: { duration: 5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
    },
  };

  const blueSubmarineAnimation = {
    animate: {
      x: ["100vw", "-100vw"],
      y: [0, 10, 0],
    },
    transition: {
      x: { duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY },
      y: { duration: 5, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY },
    },
  };

  const bubbleVariants = {
    initial: { y: 0, opacity: 0, scale: 0 },
    animate: { y: -100, opacity: [0, 1, 0], scale: [0, 1, 1.5] },
  };

  // SponsorLogo component – sizes and borders are computed based on container-relative measurements.
  const SponsorLogo = ({
    src,
    alt,
    borderColor,
    customStyle,
    computedSize,
    containerBgColor,
  }) => {
    const sizeStyle = {
      width: computedSize ? computedSize + "px" : undefined,
      height: computedSize ? computedSize + "px" : undefined,
    };
    return (
      <motion.div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center bg-white group"
        )}
        style={{
          ...sizeStyle,
          borderStyle: "solid",
          borderWidth: borderWidths[breakpoint],
          borderColor: borderColor,
          backgroundColor: containerBgColor || "white",
        }}
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
          style={{ width: "100px", height: "200px" }}
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
                left: `${i * 5 + Math.random() * 5}px`,
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

      {/* Gold Submarine Section */}
      <div
        ref={goldContainerRef}
        className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative w-full"
      >
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...goldSubmarineAnimation}
        >
          <div className="relative w-[961px] min-w-[360px]">
            <div className="relative">
              <BubbleTrail top="50%" right="0%" />
              <img
                src="/goldsub.png"
                alt="Submarine"
                className="w-full z-[5] relative"
                draggable="false"
              />
              <div
                className="sponsors absolute top-[53.5%] left-[43%] -translate-x-1/2 flex justify-around items-center gap-1 z-[5]"
                style={{ width: "34%" }}
              >
                <a href="https://google.com/" target="_blank">
                  <SponsorLogo
                    src="https://loodibee.com/wp-content/uploads/Google-Logo.png"
                    alt="Sponsor-1-Google"
                    borderColor="#705A00"
                    computedSize={goldSponsorSize}
                  />
                </a>
                <a href="https://dain.org/" target="_blank">
                  <SponsorLogo
                    src="/dainai.png"
                    alt="Sponsor-2-DainAI"
                    borderColor="#705A00"
                    customStyle={{ transform: "scale(2)" }}
                    computedSize={goldSponsorSize}
                  />
                </a>
                <a href="https://www.boot.dev/" target="_blank">
                  <SponsorLogo
                    src="/bootLogo.webp"
                    alt="Sponsor-3-Boot.Dev"
                    borderColor="#705A00"
                    customStyle={{ transform: "scale(2)", marginTop: "12%", marginLeft: "1%" }}
                    computedSize={goldSponsorSize}
                  />
                </a>
              </div>

              <div className="absolute w-[80%] -right-[90%] top-[13%] z-[2]">
                <img
                  src="/chain.png"
                  alt="Connecting Chain"
                  className="absolute -left-[25%] top-[58%] w-[25%] h-auto opacity-90 transform scale-y-[-1] z-[2]"
                  draggable="false"
                />
                <BubbleTrail top="50%" right="10%" />
                <img
                  src="/goldsub.png"
                  alt="Small Gold Submarine"
                  className="w-full relative z-[3] absolute -left-[10%]"
                  draggable="false"
                />
                <div
                  className="sponsors absolute top-[53.5%] left-[38.5%] -translate-x-1/2 flex justify-around items-center z-[4]"
                  style={{ width: "23%" }}
                >
                  <a href="https://www.asicsulb.org/corporate/" target="_blank">
                    <SponsorLogo
                      src="/COE_LB.png"
                      alt="Sponsor-ASI"
                      borderColor="#705A00"
                      computedSize={smallGoldSponsorSize}
                    />
                  </a>
                  <a href="https://www.asicsulb.org/corporate/" target="_blank">
                    <SponsorLogo
                      src="/asi-logo.png"
                      alt="Sponsor-ASI"
                      borderColor="#705A00"
                      computedSize={smallGoldSponsorSize}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Silver Submarine Section */}
      <div
        ref={silverContainerRef}
        className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative w-full"
      >
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...silverSubmarineAnimation}
        >
          <div className="relative w-[801px] min-w-[360px]">
            <div className="relative">
              <BubbleTrail top="48%" right="-2%" />
              <img
                src="/silversub.png"
                alt="Submarine"
                className="w-full z-[2] relative"
                draggable="false"
              />
              <div
                className="sponsors absolute top-[49.28%] left-[48.3%] -translate-x-1/2 flex justify-around items-center z-[3]"
                style={{ width: "34%" }}
              >
                <a href="https://www.codeandcoffee.dev/" target="_blank">
                  <SponsorLogo
                    src="/code-and-coffee.svg"
                    alt="Sponsor-3-code-and-coffee"
                    borderColor="#777777"
                    customStyle={{ transform: "scale(0.87)" }}
                    computedSize={silverSponsorSize}
                  />
                </a>
                <a href="https://www.codepath.org/" target="_blank">
                  <SponsorLogo
                    src="/code_path_logo.png"
                    alt="Sponsor-4-codepath"
                    borderColor="#777777"
                    computedSize={silverSponsorSize}
                  />
                </a>
                <a href="https://www.patientsafetytech.com/" target="_blank">
                  <SponsorLogo
                    src="/PSTC-Logo.png"
                    alt="Sponsor-5-pstc"
                    borderColor="#777777"
                    customStyle={{ transform: "scale(1.25)" }}
                    computedSize={silverSponsorSize}
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Blue Submarine Section */}
      <div
        ref={blueContainerRef}
        className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative w-full mb-28"
      >
        <motion.div
          className="submarine-container relative flex items-center w-full h-full"
          {...blueSubmarineAnimation}
        >
          <div className="relative w-[744px] min-w-[360px] mb-4">
            <div className="relative">
              <BubbleTrail top="68%" right="-5%" />
              <img
                src="/bronzesub.png"
                alt="Submarine"
                className="w-full z-[2] relative"
                draggable="false"
              />
              <div
                className="sponsors absolute top-[57.75%] left-[47.75%] -translate-x-1/2 flex justify-around items-center z-[3]"
                style={{ width: "57%" }}
              >
                <a
                  href="https://balsamiq.com/?gad_source=1&gclid=CjwKCAiA74G9BhAEEiwA8kNfpVWbLV0lGKPMG9zPEz4gXWk22PcAEhz-Q7A3fwhNBavZ_eBRoNHfMhoClUEQAvD_BwE"
                  target="_blank"
                >
                  <SponsorLogo
                    src="/balsamiq-1690452164916-2x.png"
                    alt="Sponsor-6-balsamiq"
                    borderColor="#5C4033"
                    customStyle={{ transform: "scale(1.2)" }}
                    computedSize={genericSponsorSize}
                  />
                </a>
                <a href="https://www.interviewcake.com/" target="_blank">
                  <SponsorLogo
                    src="/cake_logo_blue_gray.svg"
                    alt="Sponsor-7-interview-cake"
                    borderColor="#5C4033"
                    computedSize={genericSponsorSize}
                  />
                </a>
                <a href="https://github.com/" target="_blank">
                  <SponsorLogo
                    src="/github-logo.png"
                    alt="Sponsor-8-github"
                    borderColor="#5C4033"
                    customStyle={{ transform: "scale(0.87)" }}
                    computedSize={genericSponsorSize}
                  />
                </a>
                <a href="https://www.bazalu.com/" target="_blank">
                  <SponsorLogo
                    src="/bazalu.png"
                    alt="Sponsor-9-bazalu"
                    borderColor="#5C4033"
                    customStyle={{ transform: "scale(0.87)" }}
                    computedSize={genericSponsorSize}
                    containerBgColor={"#8C52FF"}
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
