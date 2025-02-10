
"use client";
import "./stats.css";
import { useEffect, useRef, useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

// Create the Supabase client directly in this file.
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Define a type for the CountUp component props.
interface CountUpProps {
  target: number;
  start: boolean;
  duration?: number;
  formatter?: (value: number) => string;
}

/**
 * CountUp component:
 * When `start` is true, this component will animate a number from 0 to `target`
 */
function CountUp({ target, start, duration = 2000, formatter }: CountUpProps): JSX.Element {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    // The step function receives a timestamp (number).
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * target));
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return <span>{formatter ? formatter(count) : count}</span>;
}

// Define a type for the individual stat item.
interface StatItem {
  value: string | number;
  label: string;
}

export default function Stats(): JSX.Element {
  // States to store counts from Supabase
  const [hackerCount, setHackerCount] = useState<number | null>(null);
  const [schoolCount, setSchoolCount] = useState<number | null>(null);

  // This state will be set to true when the stats section becomes visible.
  const [animate, setAnimate] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // (We’re using a fallback value until the query completes.)
  const stats: StatItem[] = [
    { value: "10+", label: "Countries" },
    { value: schoolCount !== null ? schoolCount : "20+", label: "Schools" },
    { value: "$20k", label: "Prizes" },
    { value: hackerCount !== null ? hackerCount : "200+", label: "Hackers" },
    { value: "24", label: "Hours" },
  ];

  // Use a ref to store the timeout ID so we can clear it on unmount (for the shark animation)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Set up an IntersectionObserver to start number animations when the stats section is in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // Existing shark animation useEffect
  useEffect(() => {
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
  }, []);

  // Fetch hacker and school counts from Supabase
  useEffect(() => {
    async function fetchData() {
      // 1. Fetch accepted hacker count from 'profiles'
      const { count: acceptedHackersCount, error: hackerError } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("acceptance_status", "ACCEPTED");

      if (hackerError) {
        console.error("Error fetching hacker count:", hackerError);
      } else {
        setHackerCount(acceptedHackersCount);
      }

      // 2. Fetch school entries from 'forms'
      const { data: formsData, error: formsError } = await supabase
        .from("forms")
        .select("school");

      if (formsError) {
        console.error("Error fetching forms data:", formsError);
      } else if (formsData) {
        // Count unique schools (ignoring null/empty values)
        const uniqueSchools = new Set(
          formsData.map((form: any) => form.school).filter((school: any) => !!school)
        );
        setSchoolCount(uniqueSchools.size);
      }
    }
    fetchData();
  }, []);

  // Generate random animation durations for bubbles.
  const randomDurations = useMemo(
    () => stats.map(() => (4 + Math.random() * 2).toFixed(2) + "s"),
    [stats]
  );

  return (
    <div
      id="faq"
      ref={containerRef}
      className="space-y-6 w-full p-4 max-w-screen-xxl relative overflow-hidden stats-section"
    >
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
          const duration = randomDurations[index];
          const statStr = stat.value.toString();
          // This regex matches an optional non-digit prefix, a number (with possible commas), then an optional non-digit suffix.
          const match = statStr.match(/^(\D*)([\d,]+)(\D*)$/);
          return (
            <div key={index} className="bubble-wrapper">
              <div
                className="bubble"
                style={{ animationDuration: duration }}
                suppressHydrationWarning
              >
                <div className="stat-value">
                  {match ? (
                    // If the value can be parsed, animate it.
                    <CountUp
                      target={parseInt(match[2].replace(/,/g, ""), 10)}
                      start={animate}
                      formatter={(val: number) => `${match[1]}${val}${match[3]}`}
                    />
                  ) : (
                    // Otherwise, just render the value directly.
                    stat.value
                  )}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

