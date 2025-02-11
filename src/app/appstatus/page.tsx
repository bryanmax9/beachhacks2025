"use client";
import Image from "next/image";
import Link from "next/link";

export default function AppStatus() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-[#e6b877] px-6 py-4 shadow-md z-50">
        {/* Logo */}
        <div className="w-12 h-12">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-[#1D2640] text-sm flex items-center gap-1 hover:opacity-80 font-semibold"
          >
            Back to main site
            <span>➜</span>
          </Link>

          {/* Logout Button */}
          <button className="px-5 py-2 border border-[#1D2640] text-[#1D2640] rounded-full hover:bg-[#1D2640] hover:text-white transition">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center gap-8 max-w-6xl mx-auto px-4 lg:px-8 mt-20">
        {/* Left Section: Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-full max-w-xs">
          {/* User Image */}
          <Image
            src="/dshboard_img.png" // Replace with actual image path
            alt="User Profile"
            width={1220}
            height={1220}
            className="rounded-xl"
          />

          {/* User ID */}
          <p className="mt-4 font-semibold text-[#1D2640]">User ID:</p>
          <p className="text-gray-600 break-all text-center text-sm">
            V6yzaJeT3vQWzhO9GDLr5Q
          </p>
        </div>

        {/* Right Section: Application Status */}
        <div className="bg-[#f8f9fc] p-8 rounded-lg shadow-md flex flex-col justify-center items-center w-full max-w-2xl">
          <p className="text-2xl font-semibold text-[#1D2640] text-center">
            Your application is Completed
          </p>
          <p className="text-gray-600 mt-2 text-center">
            Once your application is reviewed, we will email you, or you can
            view your application status here.
          </p>

          {/* Status Card */}
          <div className="mt-6 bg-white px-8 py-4 rounded-lg shadow-md text-center">
            <p className="text-lg font-bold">
              Status: <span className="text-[#1D2640]">Pending</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
