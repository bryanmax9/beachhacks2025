"use client";

import { useState } from "react";
import "./navbar.css"; // Import the navbar CSS

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`navbar w-full z-[9999] transition-all duration-300 ${
        isMenuOpen ? "bg-gray-900" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-white font-bold text-2xl flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
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
          className={`menu absolute lg:static top-16 right-0 w-full lg:w-auto lg:flex lg:items-center lg:space-x-6 lg:top-0 ${
            isMenuOpen ? "block bg-gray-900 p-4 rounded" : "hidden lg:block"
          }`}
        >
          <a
            href="#"
            className="block text-white text-lg hover:text-gray-400 mb-2 lg:mb-0 lg:bg-transparent"
          >
            Home
          </a>
          <a
            href="#apply"
            className="block text-white text-lg hover:text-gray-400 mb-2 lg:mb-0 lg:bg-transparent"
          >
            Apply
          </a>
          <a
            href="#login"
            className="block text-white text-lg border border-white px-4 py-1 rounded hover:bg-white hover:text-gray-800 transition-all lg:bg-transparent"
          >
            Log In
          </a>
        </div>
      </div>
    </nav>
  );
}
