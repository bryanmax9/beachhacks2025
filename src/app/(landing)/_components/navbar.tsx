"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "@/app/(landing)/_components/navbar.css";
import { createBrowser } from "@/lib/supabase/client";
import confetti from "canvas-confetti";

const Navbar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(7.5);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [applyClosed, setApplyClosed] = useState(false);
  const pathname = usePathname();
  const applyButtonRef = useRef<HTMLButtonElement>(null);

  // Check auth state on mount and subscribe to changes
  useEffect(() => {
    const supabase = createBrowser();

    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setUserExists(!!data?.user);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserExists(event === "SIGNED_IN" && !!session?.user);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Handle window mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getMaxPosition = useCallback((windowWidth: number): number => {
    if (windowWidth > 1200) return 95;
    if (windowWidth > 900) return 85;
    if (windowWidth > 600) return 75;
    return 0;
  }, []);

  const getStepSize = useCallback((windowWidth: number): number => {
    if (windowWidth > 1200) return 0.8;
    if (windowWidth > 900) return 0.6;
    if (windowWidth > 600) return 0.4;
    return 0;
  }, []);

  // Handle scroll events
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = (scrollY / maxScroll) * 100;

      const maxPosition = getMaxPosition(window.innerWidth);
      const stepSize = getStepSize(window.innerWidth);

      const newPosition = Math.min(Math.max(7.5, percentage * stepSize), maxPosition);
      setScrollPercentage(newPosition);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted, getMaxPosition, getStepSize]);

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      event.preventDefault();
      const target = document.querySelector(targetId);
      target?.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    },
    []
  );

  // Trigger confetti from the button's position
  const handleApplyClick = () => {
    if (applyButtonRef.current) {
      const rect = applyButtonRef.current.getBoundingClientRect();
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
    setApplyClosed(true);
  };

  const navLinks = [
    { href: "#tracks", label: "Tracks" },
    { href: "#sponsors", label: "Sponsors" },
    { href: "#prizes", label: "Prizes" },
    { href: "#faq", label: "FAQ" },
    { href: "#team", label: "Team" },
  ];

  const shouldShowCrab = isMounted && scrollPercentage > 0 && window.innerWidth > 900;

  return (
    <>
      {/* Moving Image (Above Navbar) */}
      {shouldShowCrab && (
        <div
          className="moving-image"
          style={{
            left: `${scrollPercentage}%`,
            transform: `translate(-50%, 0)`
          }}
        >
          <Image src="/crab.png" alt="Moving Crab" width={120} height={120} priority />
        </div>
      )}

      <nav className="navbar">
        {/* Left Section: Logo */}
        <div className="nav-left">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={45} height={45} priority />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* Apply Confetti Button */}
        <div className="login-container">
          {applyClosed ? (
            <div className="nav-closed-message">Application Closed! 🌴</div>
          ) : (
            <button ref={applyButtonRef} onClick={handleApplyClick} className="nav-login">
              Apply
            </button>
          )}
        </div>

        {/* Burger Menu for Small Screens */}
        <button
          className={`burger-menu ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Mobile Menu (Dropdown Animation) */}
        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <ul>
            {navLinks.map(({ href, label }, index) => (
              <li key={href} style={{ animationDelay: `${0.1 * index}s` }}>
                <a href={href} onClick={(e) => handleMenuClick(e, href)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
