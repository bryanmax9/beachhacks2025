"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-800/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-white font-bold text-2xl flex items-center">
          <img
            src="https://i.imgur.com/sTPoVUg.png" // Replace with your actual logo path
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span>BeachHacks</span>
        </div>

        {/* Menu Button */}
        <button
          className="text-white text-2xl lg:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute lg:static top-16 right-0 bg-gray-800 lg:bg-transparent w-full lg:w-auto lg:flex lg:items-center lg:space-x-6 lg:top-0 p-4 lg:p-0 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <a
            href="#"
            className="block text-white text-lg hover:text-gray-400 mb-2 lg:mb-0"
          >
            Home
          </a>
          <a
            href="#apply"
            className="block text-white text-lg hover:text-gray-400 mb-2 lg:mb-0"
          >
            Apply
          </a>
          <a
            href="#login"
            className="block text-white text-lg bg-transparent border border-white px-4 py-1 rounded hover:bg-white hover:text-gray-800 transition-all"
          >
            Log In
          </a>
        </div>
      </div>
    </nav>
  );
}
