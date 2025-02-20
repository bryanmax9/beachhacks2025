"use client";

import React, { useEffect, useState } from "react";
import { GUI } from "dat.gui";

interface BubbleProps {
  size: number;
  left: number;
  animationDuration: number;
}

interface Bubble extends BubbleProps {
  id: number;
}

const Bubble: React.FC<BubbleProps> = ({ size, left, animationDuration }) => (
  <div
    className="absolute rounded-full animate-float backdrop-blur-[1px]"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      bottom: "0",
      animationDuration: `${animationDuration}s`,
      background:
        "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.05) 100%)",
      boxShadow: `
                inset -3px -3px 6px rgba(0, 0, 0, 0.05),
                inset 3px 3px 6px rgba(255, 255, 255, 0.2),
                0 0 5px rgba(255, 255, 255, 0.1)
            `,
      border: "1px solid rgba(255, 255, 255, 0.1)",
    }}
  >
    <div
      className="absolute rounded-full"
      style={{
        width: "30%",
        height: "30%",
        left: "20%",
        top: "20%",
        background:
          "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 100%)",
      }}
    />
  </div>
);

interface OceanWavesProps {
  children: React.ReactNode;
}

/* -------------------------------------------------------------------------
   FishTank Component
   This component mounts the fish animation code.
------------------------------------------------------------------------- */
const FishTank: React.FC = () => {
  useEffect(() => {
    let myoptions: any, gui: any;
    const fishes = ["🐟 🐠 🐡", "🐡", "🐠", "🐟", "🐟 🐠 🦑 🐙"];
    const tank = document.getElementById("tank");
    let WINDOW_MIN: number;
    const MIN_THRESHOLD = 650;
    let timeouts: number[] = [];

    // Helper functions
    function clearTimeouts() {
      for (let i = 0; i < timeouts.length; i++) {
        window.clearTimeout(timeouts[i]);
      }
      timeouts = [];
    }

    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomFloat(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function pick(arr: any[]) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function isSquid(letter: string) {
      return /[\u{1f991}\u{1f419}]/u.test(letter);
    }

    function Options() {
      this.Presets = "Ocean Mix";
      this.NumFishGroups = "80";
      this.SingleFishOnly = false;
      this.MaxPerSchool = "20";
      this.ColorChanging = true;
      this.PercentSchools = "80";
      this.SwimSpeed = "Moderate";
      this.FishSpecies = "🐟 🐠 🐡";
    }

    function generateControls() {
      myoptions = new Options();
      gui = new GUI();
      gui
        .add(myoptions, "Presets", [
          "Ocean Mix",
          "Tropical Seas",
          "Schools",
          "Coral Reef",
          "Salmon Run",
          "Deep Water",
        ])
        .onChange(setPreset);
      gui.add(myoptions, "NumFishGroups").listen().onChange(setValue);
      gui.add(myoptions, "SingleFishOnly").listen().onChange(setValue);
      gui.add(myoptions, "MaxPerSchool").listen().onChange(setValue);
      gui.add(myoptions, "PercentSchools").listen().onChange(setValue);
      gui.add(myoptions, "ColorChanging").listen().onChange(setValue);
      gui
        .add(myoptions, "SwimSpeed", ["Slow", "Moderate", "Fast"])
        .listen()
        .onChange(setValue);
      gui.add(myoptions, "FishSpecies", fishes).listen().onChange(setValue);
    }

    function initializeTank() {
      if (!tank) return;
      WINDOW_MIN = Math.min(tank.clientHeight, tank.clientWidth);
      generateFishTank();
      if (WINDOW_MIN <= MIN_THRESHOLD) {
        gui.close();
      } else {
        gui.close();
      }
    }

    function generateFishTank() {
      if (!tank) return;
      clearTimeouts();
      tank.innerHTML = "";
      for (let i = 0; i < Number(myoptions.NumFishGroups); i++) {
        let species = pick(myoptions.FishSpecies.split(" "));
        let numFish = 1;
        if (
          !myoptions.SingleFishOnly &&
          Math.random() * 100 > 100 - Number(myoptions.PercentSchools)
        ) {
          numFish = getRandomInt(1, Number(myoptions.MaxPerSchool));
        }
        let hueShift = myoptions.ColorChanging ? getRandomInt(0, 360) : 0;

        let school = generateSchool(numFish, species, hueShift);
        tank.appendChild(school);
        loop(school);
      }
    }

    function generateSchool(
      numFish: number,
      species: string,
      hueShift: number
    ) {
      let root = document.createElement("div");
      root.setAttribute("class", "school");
      root.style.width = `${getRandomFloat(100, 1000)}px`;
      root.style.height = `${getRandomFloat(100, 700)}px`;
      root.style.left = `${getRandomFloat(0, 100)}%`;
      root.style.top = `${getRandomFloat(0, 100)}%`;

      let maxFishSize = WINDOW_MIN < MIN_THRESHOLD ? 50 : 80;
      let minFishSize = WINDOW_MIN < MIN_THRESHOLD ? 5 : 10;
      let staticSize = getRandomInt(minFishSize, maxFishSize / 2);
      let allSameSize = numFish > 1 && Math.random() > 0.7;

      for (let i = 0; i < numFish; i++) {
        let fishPos = [getRandomFloat(0, 100), getRandomFloat(0, 100)];
        let size = allSameSize
          ? staticSize
          : getRandomInt(minFishSize, maxFishSize);
        let fish = generateFish(fishPos, hueShift, size, species);
        root.appendChild(fish);
      }
      return root;
    }

    function generateFish(
      pos: number[],
      hueShift: number,
      size: number,
      icon: string
    ) {
      let htm = `<div class="direction">${icon}</div>`;
      let f = document.createElement("div");
      f.setAttribute("class", "fish");
      f.style.filter = `hue-rotate(${hueShift}deg)`;
      f.style.left = `${pos[0]}%`;
      f.style.top = `${pos[1]}%`;
      f.style.fontSize = `${size}px`;
      f.innerHTML = htm;
      return f;
    }

    function loop(school: HTMLElement) {
      let timeout = school.getAttribute("data-timeout");
      if (timeout) {
        clearTimeout(Number(timeout));
      }
      let minInterval =
        myoptions.SwimSpeed === "Slow"
          ? 10000
          : myoptions.SwimSpeed === "Moderate"
          ? 5000
          : 3000;
      let maxInterval =
        myoptions.SwimSpeed === "Slow"
          ? 30000
          : myoptions.SwimSpeed === "Moderate"
          ? 20000
          : 10000;
      let nextCall = getRandomInt(minInterval, maxInterval);
      moveSchool(school, nextCall);
      timeout = setTimeout(() => loop(school), nextCall);
      timeouts.push(timeout);
      school.setAttribute("data-timeout", timeout.toString());
    }

    function moveSchool(school: HTMLElement, nextCall: number) {
      let currentX = parseInt(school.getAttribute("data-x") || "0");
      let fishEl = school.querySelector(".fish");
      let moveMoreVertically = fishEl
        ? isSquid(fishEl.textContent || "")
        : false;
      let newX =
        moveMoreVertically && tank
          ? getRandomFloat(-tank.clientWidth / 4, tank.clientWidth / 4)
          : tank
          ? getRandomFloat(-tank.clientWidth, tank.clientWidth)
          : 0;
      let newY =
        moveMoreVertically && tank
          ? getRandomFloat(-tank.clientHeight, tank.clientHeight)
          : tank
          ? getRandomFloat(-tank.clientHeight / 4, tank.clientHeight / 4)
          : 0;

      const isRight = newX > currentX;
      let easing = Math.random() > 0.5 ? "ease" : "ease-in-out";
      school.style.transition = `transform ${nextCall}ms ${easing}`;
      school.style.transform = `translate(${newX}px, ${newY}px)`;
      school.setAttribute("data-x", newX.toString());

      let maxTranslationDistance = WINDOW_MIN < MIN_THRESHOLD ? 50 : 100;
      Array.from(school.querySelectorAll(".fish")).forEach((fish) => {
        let direction = fish.querySelector(".direction") as HTMLElement;
        if (direction) {
          direction.style.transform = `scaleX(${isRight ? -1 : 1})`;
          direction.style.transition = `transform ${getRandomFloat(0.2, 0.6)}s`;
        }
        if (school.children.length > 1) {
          let translateX = getRandomFloat(
            -maxTranslationDistance,
            maxTranslationDistance
          );
          let translateY = getRandomFloat(
            -maxTranslationDistance,
            maxTranslationDistance
          );
          (
            fish as HTMLElement
          ).style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
          let easing = Math.random() > 0.5 ? "ease" : "ease-in-out";
          (
            fish as HTMLElement
          ).style.transition = `all ${nextCall}ms ${easing}`;
        }
      });
    }

    function setValue() {
      generateFishTank();
    }

    function setPreset(value: string) {
      myoptions.SwimSpeed = "Moderate";
      switch (value) {
        case "Ocean Mix":
          myoptions.NumFishGroups = "20";
          myoptions.SingleFishOnly = false;
          myoptions.MaxPerSchool = "7";
          myoptions.ColorChanging = true;
          myoptions.PercentSchools = "25";
          myoptions.FishSpecies = "🐟 🐠 🐡";
          setGUI("FishSpecies", "🐟 🐠 🐡");
          setGUI("ColorChanging", true);
          setGUI("SingleFishOnly", false);
          break;
        case "75 Lone Fish":
          myoptions.NumFishGroups = "75";
          myoptions.SingleFishOnly = true;
          myoptions.ColorChanging = false;
          myoptions.FishSpecies = "🐟 🐠 🐡";
          setGUI("FishSpecies", "🐟 🐠 🐡");
          setGUI("SingleFishOnly", true);
          setGUI("ColorChanging", false);
          break;
        case "Tropical Seas":
          myoptions.NumFishGroups = "100";
          myoptions.SingleFishOnly = true;
          myoptions.ColorChanging = true;
          myoptions.SwimSpeed = "Slow";
          myoptions.FishSpecies = "🐠";
          setGUI("FishSpecies", "🐠");
          setGUI("SingleFishOnly", true);
          setGUI("ColorChanging", true);
          break;
        case "Schools":
          myoptions.NumFishGroups = "10";
          myoptions.SingleFishOnly = false;
          myoptions.MaxPerSchool = "10";
          myoptions.ColorChanging = false;
          myoptions.PercentSchools = "100";
          myoptions.FishSpecies = "🐟 🐠 🐡";
          setGUI("FishSpecies", "🐟 🐠 🐡");
          setGUI("SingleFishOnly", false);
          setGUI("ColorChanging", false);
          break;
        case "Coral Reef":
          myoptions.NumFishGroups = "100";
          myoptions.SingleFishOnly = false;
          myoptions.MaxPerSchool = "35";
          myoptions.ColorChanging = true;
          myoptions.PercentSchools = "36";
          myoptions.SwimSpeed = "Slow";
          myoptions.FishSpecies = "🐟 🐠 🐡";
          setGUI("FishSpecies", "🐟 🐠 🐡");
          setGUI("SingleFishOnly", false);
          setGUI("ColorChanging", true);
          break;
        case "Salmon Run":
          myoptions.NumFishGroups = "100";
          myoptions.SingleFishOnly = true;
          myoptions.ColorChanging = false;
          myoptions.SwimSpeed = "Fast";
          myoptions.FishSpecies = "🐟";
          setGUI("FishSpecies", "🐟");
          setGUI("SingleFishOnly", true);
          setGUI("ColorChanging", false);
          break;
        case "Deep Water":
          myoptions.NumFishGroups = "50";
          myoptions.SingleFishOnly = true;
          myoptions.ColorChanging = false;
          myoptions.FishSpecies = "🐟 🐠 🦑 🐙";
          setGUI("FishSpecies", "🐟 🐠 🦑 🐙");
          setGUI("SingleFishOnly", true);
          setGUI("ColorChanging", false);
          break;
        default:
          break;
      }
      generateFishTank();
    }

    function setGUI(name: string, val: any) {
      gui.__controllers.forEach((controller: any) => {
        if (controller.property === name) {
          controller.setValue(val);
        }
      });
    }

    if (tank) {
      generateControls();
      initializeTank();
    }

    const resizeHandler = () => {
      initializeTank();
    };
    window.addEventListener("resize", resizeHandler);
    tank?.addEventListener("click", () => {
      gui.closed ? gui.open() : gui.close();
    });

    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeouts();
    };
  }, []);

  return (
    <div id="fish-container" className="absolute inset-0 pointer-events-auto">
      <p id="controls"></p>
      <div id="tank"></div>
      <style jsx>{`
        #tank {
          width: 100%;
          height: 100%;
        }
        .school {
          position: absolute;
          top: 50%;
          left: 50%;
        }
        .fish {
          position: absolute;
        }
      `}</style>
    </div>
  );
};

/* -------------------------------------------------------------------------
   OceanWaves Component
   Includes bubbles, the top SVG wave, and now our FishTank component.
------------------------------------------------------------------------- */
const OceanWaves: React.FC<OceanWavesProps> = ({ children }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const createBubble = (): void => {
      const bubble: Bubble = {
        id: Math.random(),
        size: Math.random() * 15 + 8,
        left: Math.random() * 100,
        animationDuration: Math.random() * 10 + 15,
      };

      setBubbles((prev) => [...prev, bubble]);

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
      }, bubble.animationDuration * 1000);
    };

    const intervalId = setInterval(createBubble, 800);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Top section with wave */}
      <div className="h-[320px] bg-[#54b4c4] w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute left-0 w-full"
        >
          <defs>
            <linearGradient id="waterGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ecbc7c" stopOpacity="1" />
              <stop offset="100%" stopColor="#d4a76a" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            className="opacity-50"
            d="M0,288L30,245.3C60,203,120,117,180,96C240,75,300,117,360,128C420,139,480,117,540,106.7C600,96,660,96,720,112C780,128,840,160,900,154.7C960,149,1020,107,1080,101.3C1140,96,1200,128,1260,170.7C1320,213,1380,267,1410,293.3L1440,320L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="18"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            fill="url(#waterGradient)"
            d="M0,288L30,245.3C60,203,120,117,180,96C240,75,300,117,360,128C420,139,480,117,540,106.7C600,96,660,96,720,112C780,128,840,160,900,154.7C960,149,1020,107,1080,101.3C1140,96,1200,128,1260,170.7C1320,213,1380,267,1410,293.3L1440,320L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          />
        </svg>
      </div>

      {/* Underwater section with content */}
      <div className="relative min-h-screen bg-[#54b4c4] w-full">
        {/* Water gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2a5964] pointer-events-none" />

        {/* Fish Tank */}
        <FishTank />

        {/* Content container - centered and full width */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center">
            {children}
          </div>
        </div>

        {/* Bubbles */}
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            size={bubble.size}
            left={bubble.left}
            animationDuration={bubble.animationDuration}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
            transform: translateY(-10vh) translateX(-5px) scale(1.1);
          }
          50% {
            opacity: 0.4;
            transform: translateY(-50vh) translateX(10px) scale(1);
          }
          90% {
            opacity: 0.3;
            transform: translateY(-90vh) translateX(-5px) scale(0.9);
          }
          100% {
            transform: translateY(-100vh) translateX(0) scale(0.8);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float var(--duration, 15s) ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OceanWaves;
