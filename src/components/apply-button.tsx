"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { createBrowser } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { dynaPuff } from "@/assets/fonts";

const ApplyButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [closed, setClosed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const supabase = createBrowser();
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data?.user);
    }
    checkAuth();

    // Subscribe to auth state changes (optional but recommended)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session?.user);
    });
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Trigger confetti from the button's position
  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 150,
        spread: 60,
        origin: { x, y },
      });
    } else {
      confetti({ particleCount: 150, spread: 60 });
    }
    setClosed(true);
  };

  return (
    <div className={cn("relative group", dynaPuff.className)}>
      {closed ? (
        <div className="text-center text-xl md:text-2xl font-bold text-white">
          Application closed, we'll see you in 2026! 🌴
        </div>
      ) : (
        <button
          ref={buttonRef}
          onClick={handleClick}
          className={cn(
            "relative tracking-widest inline-flex items-center justify-center",
            "px-8 py-4 text-xl md:text-2xl font-bold",
            "bg-gradient-to-r from-cyan-500 via-blue-500 to-yellow-400",
            "text-white shadow-lg",
            "rounded-full border-4 border-white",
            "transform transition-all duration-300",
            "hover:scale-105 hover:shadow-xl hover:from-cyan-600 hover:via-blue-600 hover:to-yellow-500",
            "active:scale-95",
            "overflow-hidden"
          )}
        >
          <span className="relative z-10">Apply Now! 🌴</span>
          {/* Animated wave effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={cn(
                "absolute inset-0 bg-white/20",
                "transform -skew-x-12 -translate-x-full",
                "group-hover:animate-shine"
              )}
            />
          </div>
        </button>
      )}
    </div>
  );
};

export default ApplyButton;