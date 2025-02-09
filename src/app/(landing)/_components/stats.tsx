"use client";
import "./stats.css";
import { useEffect, useRef, useMemo } from "react";

export default function Stats() {
  const isClient = typeof window !== 'undefined';

  const stats = [
    { value: "500+", label: "Participants" },
    { value: "48", label: "Hours" },
    { value: "$50,000+", label: "Prizes" },
    { value: "10+", label: "Sponsors" },
    { value: "20+", label: "Workshops" },
  ];

  // Use a ref to store the timeout ID so we can clear it on unmount
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isClient) return;

    const shark = document.getElementById("shark") as HTMLElement | null;
    const statsSection = document.querySelector(".stats-section") as HTMLElement | null;
    if (!shark || !statsSection) return;

    let lastDirection = 1; // Tracks the shark's last direction

    const randomSwim = () => {
      const sharkWidth = shark.offsetWidth;
      const sharkHeight = shark.offsetHeight;

      const sectionWidth = statsSection.offsetWidth;
      const sectionHeight = statsSection.offsetHeight;

      // Define how high or low the shark can go
      const topMargin = 80;
      const bottomMargin = 80;

      // Calculate the maximum allowed width and height
      const maxX = sectionWidth - sharkWidth;
      const maxY = sectionHeight - sharkHeight - bottomMargin;

      // Generate random X, Y within the vertical limits
      const x = Math.random() * maxX;
      const y = topMargin + Math.random() * (maxY - topMargin);

      // Determine direction based on new X vs current X
      const currentX = parseFloat(shark.style.left || "0");
      const direction = x > currentX ? 1 : -1;
      lastDirection = direction;

      // Remove floating class while moving
      shark.classList.remove("floating");

      // Position and flip the shark
      shark.style.left = `${x}px`;
      shark.style.top = `${y}px`;
      shark.style.transform = `translate(0, 0) scaleX(${direction})`;

      // Reapply floating after the move
      setTimeout(() => {
        shark.classList.add("floating");
        shark.dataset.direction = `${lastDirection}`;
      }, 2000);

      // Random delay between 4s and 10s for the next swim
      const nextDelay = 4000 + Math.random() * 6000;
      timerRef.current = setTimeout(randomSwim, nextDelay);
    };

    // Start the initial random swim
    randomSwim();

    // Cleanup the timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isClient]);

  // Generate random animation durations for bubbles.
  // This useMemo computes the values only once per component instance.
  const randomDurations = useMemo(
    () => stats.map(() => (4 + Math.random() * 2).toFixed(2) + "s"),
    []
  );

  return (
    <div id="faq" className="space-y-6 w-full mt-48 p-4 max-w-screen-xl relative overflow-hidden stats-section">
      <div>
        <h2 className="stats-heading text-3xl font-bold text-center mb-12 text-gray-800">
          Event Stats
        </h2>

        {/* Shark */}
        <div id="shark" className="floating" data-direction="1">
          <div className="shark-body"></div>
          <div className="shark-eye"></div>
          <div className="aleta"></div>
          <div className="tail"></div>
          <div className="fin"></div>
          <div className="gill gill-1"></div>
          <div className="gill gill-2"></div>
          <div className="gill gill-3"></div>
        </div>
      </div>

      {/* Bubbles Container */}
      <div className="bubble-stats-container">
        {stats.map((stat, index) => {
          // Use the memoized random duration for this bubble
          const duration = randomDurations[index];
          return (
            <div key={index} className="bubble-wrapper">
              <div
                className="bubble"
                style={{ animationDuration: duration }}
                suppressHydrationWarning
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
