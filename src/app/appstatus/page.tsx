"use client";
import Image from "next/image";
import Link from "next/link";

export default function AppStatus() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-[#e6b877] px-8 py-5 shadow-md z-50">
        {/* Logo */}
        <div className="w-20 h-20">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-[#1D2640] text-xl flex items-center gap-3 hover:opacity-80 font-semibold"
          >
            Back to main site
            <span>➜</span>
          </Link>

          {/* Logout Button */}
          <button className="px-8 py-4 border border-[#1D2640] text-[#1D2640] rounded-full hover:bg-[#1D2640] hover:text-white transition text-xl">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center gap-16 max-w-8xl mx-auto px-12 lg:px-16 mt-28">
        {/* Left Section: Profile Info */}
        <div className="bg-white p-12 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-2xl">
          {/* User Image */}
          <Image
            src="/dshboard_img.png" // Replace with actual image path
            alt="User Profile"
            width={1600}
            height={1600}
            className="rounded-3xl"
          />

          {/* User ID */}
          <p className="mt-8 text-2xl font-semibold text-[#1D2640]">User ID:</p>
          <p className="text-gray-600 break-all text-center text-xl">
            V6yzaJeT3vQWzhO9GDLr5Q
          </p>
        </div>

        {/* Right Section: Application Status */}
        <div className="bg-[#f8f9fc] p-16 rounded-2xl shadow-xl flex flex-col justify-center items-center w-full max-w-5xl">
          <p className="text-4xl font-semibold text-[#1D2640] text-center">
            Your application is Completed
          </p>
          <p className="text-gray-600 mt-6 text-center text-xl">
            Once your application is reviewed, we will email you, or you can
            view your application status here.
          </p>

          {/* Status Card */}
          <div className="mt-10 bg-white px-12 py-8 rounded-2xl shadow-lg text-center">
            <p className="text-3xl font-bold">
              Status: <span className="text-[#1D2640]">Pending</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
