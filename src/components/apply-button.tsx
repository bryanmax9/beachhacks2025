"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createBrowser } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { dynaPuff } from "@/assets/fonts";

const ApplyButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createBrowser();
    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser();
      setIsAuthenticated(!!data?.user);
    }
    checkAuth();

    // Subscribe to auth state changes (optional but recommended)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session?.user);
      }
    );
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <div className={cn("relative group", dynaPuff.className)}>
      <Link
        href={isAuthenticated ? "/appstatus" : "/login"}
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
        <span className="relative z-10">
          {isAuthenticated ? "Dashboard 😎" : "Apply Now! 🌴"}
        </span>

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
      </Link>
    </div>
  );
};

export default ApplyButton;
