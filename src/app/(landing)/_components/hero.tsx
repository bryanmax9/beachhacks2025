"use client";

import { useEffect, useState, useRef } from "react";
import "./hero.css";
import { cn } from "@/lib/utils";
import { dynaPuff } from "@/assets/fonts";
import ApplyButton from "@/components/apply-button";

export default function Hero() {
  // Timer countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Customizable target date
  const targetDate = new Date(`${new Date().getFullYear()}-03-22T00:00:00`);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const [palmPosition, setPalmPosition] = useState("-translate-x-full"); // Initial position for the left palm tree

  // Add check for window object
  const isClient = typeof window !== "undefined";

  // Countdown logic
  useEffect(() => {
    // Only run countdown if we're in the browser
    if (!isClient) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isClient, targetDate]);

  // Animate the left palm tree on load
  useEffect(() => {
    setTimeout(() => {
      setPalmPosition("translate-x-0");
    }, 300);
  }, []);

  // Add window check for mouse position tracking
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isClient]);

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
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 7.5);

    const angle = Math.atan2(dy, dx);

    return {
      transform: `translate(${Math.cos(angle) * distance}px, ${
        Math.sin(angle) * distance
      }px)`,
    };
  };
  return (
    <section
      className="-mt-24 select-none hero relative h-[110vh]  flex items-center bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, #87CEEB, #B0E0E6)", // Sky blue gradient
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/40 to-transparent"></div>

      {/* Palm Tree 1 (Original Position) */}
      <div className="palm-tree palm-tree-1">
        <img src="/left-palms.png" alt="Palm Tree" />
      </div>

      {/* Palm Tree 2 (Lower Position) */}
      <div className="palm-tree palm-tree-2">
        <img src="/left-palms.png" alt="Palm Tree" />
      </div>

      {/* CSULB Crab */}
      <div
        className="absolute bottom-[2%]  right-[5%] transform z-30"
        style={{ width: "280px", height: "280px" }}
      >
        <img
          src="/csulb-crab.png"
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

      <div className={cn("content-container", dynaPuff.className)}>
        <h1 className="content-title">BeachHacks 8.0</h1>
        <p
          className={cn(
            "content-description font-semibold",
            dynaPuff.className
          )}
        >
          March 22th-23th
        </p>
        <div className={cn("countdown", dynaPuff.className)}>
          <div>
            <span>{timeLeft.days.toString().padStart(2, "0")}</span>
            <p>Days</p>
          </div>
          <div>
            <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
            <p>Hours</p>
          </div>
          <div>
            <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
            <p>Minutes</p>
          </div>
          <div>
            <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
            <p>Seconds</p>
          </div>
        </div>
        <ApplyButton />
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
        <img src="/csulb-pyramid.png" alt="pyramid csulb" className="pyramid" />
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

      {/* Wave container 🌊 */}

      <div className="wave-container">
        {Array.from({ length: 4 }).map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className={`wave ${index % 2 === 1 ? "wave-reflected" : ""}`}
          >
            <path
              fill={index % 2 === 0 ? "#00bfff" : "#87ceeb"}
              fillOpacity="0.6"
              d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,176C672,171,768,149,864,128C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate
                attributeName="d"
                dur={`${3 + index * 2}s`}
                repeatCount="indefinite"
                values="
            M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,176C672,171,768,149,864,128C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,181.3C672,203,768,213,864,197.3C960,181,1056,139,1152,112C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,176C672,171,768,149,864,128C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></animate>
            </path>
          </svg>
        ))}
      </div>
    </section>
  );
}
