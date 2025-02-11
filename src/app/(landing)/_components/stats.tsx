"use client";
import "./stats.css";
import { useEffect, useRef, useMemo, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
interface CountUpProps {
  target: number;
  start: boolean;
  duration?: number;
  formatter?: (value: number) => string;
}

/**
 * CountUp component:
 * When `start` is true, this component will animate a number from 0 to `target`
 * over `duration` milliseconds. The optional `formatter` function allows you
 * to modify the final display (for example, adding a prefix or suffix) when the
 * count is complete.
 */
function CountUp({ target, start, duration = 1000, formatter }: CountUpProps): JSX.Element {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

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

interface StatItem {
  value: string | number;
  label: string;
}

export default function Stats(): JSX.Element {
  const [hackerCount, setHackerCount] = useState<number | null>(null);
  const [schoolCount, setSchoolCount] = useState<number | null>(null);

  const [animate, setAnimate] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stats array for the other bubbles.
  const stats: StatItem[] = [
    { value: "10+", label: "Countries" },
    { value: schoolCount !== null ? schoolCount : "0", label: "Universities" },
    { value: "$5,000", label: "Prizes" },
    { value: hackerCount !== null ? hackerCount : "0", label: "Hackers" },
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

  useEffect(() => {
    const shark = document.getElementById("shark") as HTMLElement | null;
    const statsSection = document.querySelector(".stats-section") as HTMLElement | null;
    if (!shark || !statsSection) return;

    let lastDirection = 1;

    const randomSwim = () => {
      const sharkWidth = shark.offsetWidth;
      const sharkHeight = shark.offsetHeight;
      const sectionWidth = statsSection.offsetWidth;
      const sectionHeight = statsSection.offsetHeight;
      const topMargin = 80;
      const bottomMargin = 80;
      const maxX = sectionWidth - sharkWidth;
      const maxY = sectionHeight - sharkHeight - bottomMargin;
      const x = Math.random() * maxX;
      const y = topMargin + Math.random() * (maxY - topMargin);
      const currentX = parseFloat(shark.style.left || "0");
      const direction = x > currentX ? 1 : -1;
      lastDirection = direction;

      shark.classList.remove("floating");
      shark.style.left = `${x}px`;
      shark.style.top = `${y}px`;
      shark.style.transform = `translate(0, 0) scaleX(${direction})`;

      setTimeout(() => {
        shark.classList.add("floating");
        shark.dataset.direction = `${lastDirection}`;
      }, 2000);

      const nextDelay = 4000 + Math.random() * 6000;
      timerRef.current = setTimeout(randomSwim, nextDelay);
    };

    randomSwim();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data: hackerData, error: hackerError } = await supabase
        .from("hacker_count")
        .select("total_hackers");

      if (hackerError) {
        console.error("Error fetching hacker count:", hackerError);
      } else if (hackerData && hackerData.length > 0) {
        setHackerCount(hackerData[0].total_hackers);
      }

      const { data: schoolData, error: schoolError } = await supabase
        .from("unique_school_count")
        .select("total_schools");

      if (schoolError) {
        console.error("Error fetching school count:", schoolError);
      } else if (schoolData && schoolData.length > 0) {
        setSchoolCount(schoolData[0].total_schools);
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
      className="space-y-6 w-full p-4 max-w-6xl relative overflow-hidden stats-section"
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
          const valStr = stat.value.toString();

          // For Prizes: remove the dollar sign during the count-up and add it only when finished.
          if (stat.label === "Prizes") {
            const match = valStr.match(/^\$(\d+(?:,\d+)*)(\D*)$/);
            if (match) {
              const target = parseInt(match[1].replace(/,/g, ""), 10);
              const extraSuffix = match[2] || "";
              return (
                <div key={index} className="bubble-wrapper">
                  <div className="bubble" style={{ animationDuration: duration }} suppressHydrationWarning>
                    <div className="stat-value">
                      <CountUp
                        target={target}
                        start={animate}
                        formatter={(val: number) => (val === target ? `$${val}${extraSuffix}` : `${val}`)}
                      />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              );
            }
          }
          // For Hackers: show the main value as 200 (no plus sign) and, below, display the spots left.
          else if (stat.label === "Hackers") {
            const capacity = 200;
            return (
              <div key={index} className="bubble-wrapper">
                <div className="bubble" style={{ animationDuration: duration }} suppressHydrationWarning>
                  <div className="stat-value">
                    <CountUp
                      target={capacity}
                      start={animate}
                      formatter={(val: number) => (val === capacity ? `${val}` : `${val}`)}
                    />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-extra z-10 text-gray-800" style={{ fontSize: "0.7rem", marginTop: "0.25rem" }}>
                    {`${capacity - (hackerCount || 0)} spots left!`}
                  </div>
                </div>
              </div>
            );
          }
          // For Countries and Schools: always append a plus sign when the animation is done, except when the target is 0.
          else if (stat.label === "Countries" || stat.label === "Universities") {
            const match = valStr.match(/^(\d+(?:,\d+)*)(\+?)$/);
            if (match) {
              const target = parseInt(match[1].replace(/,/g, ""), 10);
              return (
                <div key={index} className="bubble-wrapper">
                  <div className="bubble" style={{ animationDuration: duration }} suppressHydrationWarning>
                    <div className="stat-value">
                      <CountUp
                        target={target}
                        start={animate}
                        formatter={(val: number) =>
                          target === 0 ? "0" : val === target ? `${val}+` : `${val}`
                        }
                      />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              );
            }
          }
          // For any other stat (for example, Hours), simply render the number.
          else {
            const target = parseInt(valStr, 10);
            return (
              <div key={index} className="bubble-wrapper">
                <div className="bubble" style={{ animationDuration: duration }} suppressHydrationWarning>
                  <div className="stat-value">
                    <CountUp target={target} start={animate} />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
