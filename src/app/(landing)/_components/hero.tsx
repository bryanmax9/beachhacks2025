"use client";

import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pupilRadius, setPupilRadius] = useState(7.5); // Default radius

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState("translate-y-20 opacity-0");
  const [sharkAnimation, setSharkAnimation] = useState(
    "translate-y-20 opacity-0"
  );
  const [palmPosition, setPalmPosition] = useState("-translate-x-full"); // Initial position for the palm tree
  const [palmPositionRight, setPalmPositionRight] =
    useState("translate-x-full");

  const [waveBottom, setWaveBottom] = useState("20vh");

  useEffect(() => {
    const updateWaveBottom = () => {
      setWaveBottom(
        window.innerWidth <= 768
          ? "10vh"
          : window.innerWidth <= 1024
          ? "15vh"
          : "20vh"
      );
    };

    updateWaveBottom(); // Set the initial value
    window.addEventListener("resize", updateWaveBottom);

    return () => {
      window.removeEventListener("resize", updateWaveBottom);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setTranslateY("translate-y-40 opacity-100");
        setSharkAnimation("translate-y-10 opacity-100");
        setPalmPosition("-translate-x-[20%]"); // Left tree moves slightly off-screen
        setPalmPositionRight("translate-x-[20%]"); // Right tree moves slightly off-screen
      } else {
        setTranslateY("translate-y-10 opacity-100");
        setSharkAnimation("translate-y-0 opacity-100");
        setPalmPosition("translate-x-0"); // Left tree fully visible
        setPalmPositionRight("translate-x-0"); // Right tree fully visible
      }
    };

    // Trigger animations on load
    setTimeout(() => {
      setTranslateY("translate-y-10 opacity-100");
      setSharkAnimation("translate-y-0 opacity-100");
      setPalmPosition("translate-x-0"); // Animate left tree into view
      setPalmPositionRight("translate-x-0"); // Animate right tree into view
    }, 300);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setMousePosition({ x: event.clientX, y: event.clientY });
          throttleTimeout = null;
        }, 16); // Roughly 60fps (1000ms/60 = ~16ms)
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  const getCombinedPupilStyle = () => {
    if (!leftEyeRef.current || !rightEyeRef.current) return {};

    const leftRect = leftEyeRef.current.getBoundingClientRect();
    const rightRect = rightEyeRef.current.getBoundingClientRect();

    // Calculate centers
    const leftEyeCenterX = leftRect.left + leftRect.width / 2;
    const leftEyeCenterY = leftRect.top + leftRect.height / 2;
    const rightEyeCenterX = rightRect.left + rightRect.width / 2;
    const rightEyeCenterY = rightRect.top + rightRect.height / 2;

    // Average center
    const avgCenterX = (leftEyeCenterX + rightEyeCenterX) / 2;
    const avgCenterY = (leftEyeCenterY + rightEyeCenterY) / 2;

    // Movement relative to average
    const dx = mousePosition.x - avgCenterX;
    const dy = mousePosition.y - avgCenterY;
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), pupilRadius); // Use pupilRadius here

    const angle = Math.atan2(dy, dx);

    return {
      transform: `translate(${Math.cos(angle) * distance}px, ${
        Math.sin(angle) * distance
      }px)`,
    };
  };

  return (
    <section
      className="hero relative h-[120vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, #87CEEB, #B0E0E6)", // Sky blue gradient
      }}
    >
      {/* Load Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
        rel="stylesheet"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/40 to-transparent"></div>

      {/* Palm Tree */}
      <div
        className={`absolute top-[40%] left-0 transform ${palmPosition} translate-y-[-50%] z-20 transition-all duration-700 ease-in-out`}
      >
        <img
          src="https://i.imgur.com/aZ8QBCP.png"
          alt="Palm Tree"
          className="w-[400px] h-[530px] md:w-[400px] md:h-[530px]  sm:w-[400px] sm:h-[530px] "
        />
      </div>

      {/* CSULB Crab */}
      <div
        className="absolute bottom-[2%]  right-[5%] transform z-30"
        style={{ width: "280px", height: "280px" }}
      >
        <img
          src="https://i.imgur.com/qdBWmf2.png"
          alt="CSULB Crab"
          className="absolute w-full h-full"
        />
        {/* Left Eye */}
        <div
          ref={leftEyeRef}
          className="absolute left-[95px] top-[120px] w-[45px] h-[45px]"
        >
          <div
            className="absolute w-[12px] h-[12px] bg-white rounded-full transition-transform duration-100 ease-in"
            style={getCombinedPupilStyle()} // Adjust radius for smoother movement
          ></div>
        </div>
        {/* Right Eye */}
        <div
          ref={rightEyeRef}
          className="absolute left-[150px] top-[125px] w-[45px] h-[45px]"
        >
          <div
            className="absolute w-[12px] h-[12px] bg-white rounded-full transition-transform duration-100 ease-in"
            style={getCombinedPupilStyle()} // Shared function for both eyes
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="content-container">
        {/* Blurred Background */}
        <div className="blurred-background"></div>

        {/* Text Content */}
        <h1 className="content-title">Welcome to BeachHacks 7.0</h1>
        <p className="content-description">
          Join us for an{" "}
          <span className="highlighted-text">amazing hackathon</span>{" "}
          experience!
        </p>

        {/* Apply Button */}
        <a href="#apply" className="apply-button">
          Apply Now
        </a>
      </div>

      {/* First SVG Wave */}
      <div className="first-svg-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 400"
          className="svg-content"
        >
          <path
            fill="#ecbc7c"
            fillOpacity="1"
            d="M0,160L48,160C96,160,192,160,288,150.7C384,141,480,117,576,96C672,75,768,53,864,69.3C960,85,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,400L1392,400C1344,400,1248,400,1152,400C1056,400,960,400,864,400C768,400,672,400,576,400C480,400,384,400,288,400C192,400,96,400,48,400L0,400Z"
          ></path>
        </svg>
        {/* Adjust pyramid position for medium and small screens */}
        <img
          src="https://i.imgur.com/CjXsMoO.png"
          alt="pyramid csulb"
          className="pyramid"
        />
      </div>

      {/* Second SVG Wave */}
      <div className="second-svg-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="svg-content"
        >
          <path
            fill="#f8d48c"
            fillOpacity="1"
            d="M0,64L80,90.7C160,117,320,171,480,176C640,181,800,139,960,128C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Third SVG Wave */}
      <div className={`third-svg ${translateY}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#6cccc4"
            fillOpacity="1"
            d="M0,32L40,64C80,96,160,160,240,181.3C320,203,400,181,480,176C560,171,640,181,720,176C800,171,880,149,960,144C1040,139,1120,149,1200,149.3C1280,149,1360,139,1400,133.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Shark Image */}
      <div
        className={`shark-image absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-in-out ${sharkAnimation}`}
      >
        <img src="https://i.imgur.com/NA0Yvn1.png" alt="Shark" />
      </div>

      {/* Fourth SVG Wave */}
      <div className="fourth-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="#54b4c4"
            fillOpacity="1"
            d="M0,160L40,144C80,128,160,96,240,90.7C320,85,400,107,480,122.7C560,139,640,149,720,149.3C800,149,880,139,960,144C1040,149,1120,171,1200,154.7C1280,139,1360,85,1400,58.7L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
