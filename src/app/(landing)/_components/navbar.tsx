"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/app/(landing)/_components/navbar.css";
import { createBrowser } from "@/lib/supabase/client";

const Navbar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(7.5);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userExists, setUserExists] = useState<boolean>(false);

  // Check auth state on mount and subscribe to changes
  useEffect(() => {
    const supabase = createBrowser();

    // Initial check: call getUser to update the state
    async function checkAuth() {
      const { data, error } = await supabase.auth.getUser();
      // If there's a user, mark as authenticated; otherwise, not.
      setUserExists(!!data?.user);
    }
    checkAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session?.user) {
          setUserExists(false);
        } else if (event === "SIGNED_IN" && session?.user) {
          setUserExists(true);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollY / maxScroll) * 100;

      let maxPosition: number;
      let stepSize: number = 0;

      if (window.innerWidth > 1200) {
        maxPosition = 95;
        stepSize = 0.8;
      } else if (window.innerWidth > 900) {
        maxPosition = 85;
        stepSize = 0.6;
      } else if (window.innerWidth > 600) {
        maxPosition = 75;
        stepSize = 0.4;
      } else {
        maxPosition = 0;
      }

      const newPosition = Math.min(Math.max(7.5, percentage * stepSize), maxPosition);
      setScrollPercentage(newPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Moving Image (Above Navbar) */}
      {scrollPercentage > 0 && window.innerWidth > 900 && (
        <div className="moving-image" style={{ left: `${scrollPercentage}%` }}>
          <Image src="/crab.png" alt="Moving Image" width={120} height={120} />
        </div>
      )}

      <nav className="navbar">
        {/* Left Section: Logo */}
        <div className="nav-left">
          <Image src="/logo.png" alt="Logo" width={45} height={45} />
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link href="#track">Tracks</Link>
          </li>
          <li>
            <Link href="#sponsors">Sponsors</Link>
          </li>
          <li>
            <Link href="#prices">Prizes</Link>
          </li>
          <li>
            <Link href="#faq">FAQ</Link>
          </li>
          <li>
            <Link href="#team">Team</Link>
          </li>
        </ul>

        {/* Login Button: shows Dashboard if authenticated; otherwise Sign In */}
        <div className="login-container">
          {userExists ? (
            <Link href="/appstatus" className="nav-login">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="nav-login">
              Sign In
            </Link>
          )}
        </div>

        {/* Burger Menu for Small Screens */}
        <button className="burger-menu" onClick={() => setIsMenuOpen(true)}>
          ☰
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
            <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
              ✕
            </button>
            <ul>
              <li>
                <a href="#tracks" onClick={(e) => handleMenuClick(e, "#tracks")}>
                  Tracks
                </a>
              </li>
              <li>
                <a
                  href="#sponsors"
                  onClick={(e) => handleMenuClick(e, "#sponsors")}
                >
                  Sponsors
                </a>
              </li>
              <li>
                <a
                  href="#prizes"
                  onClick={(e) => handleMenuClick(e, "#prizes")}
                >
                  Prizes
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleMenuClick(e, "#faq")}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#team" onClick={(e) => handleMenuClick(e, "#team")}>
                  Team
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
