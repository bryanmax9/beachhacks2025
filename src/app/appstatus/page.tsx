"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createBrowser } from "@/lib/supabase/client";

export default function AppStatus() {
  const [userId, setUserId] = useState("");
  const [acceptanceStatus, setAcceptanceStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      const supabase = createBrowser();

      // Get the logged-in user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        setLoading(false);
        return;
      }
      // Use the logged-in user id or fallback to a hardcoded id
      const id = userData?.user?.id || "V6yzaJeT3vQWzhO9GDLr5Q";
      setUserId(id);

      // Get the acceptance_status from the profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("acceptance_status")
        .eq("id", id)
        .single();

      if (profileError) {
        console.error("Error fetching acceptance_status:", profileError);
      } else if (profileData) {
        setAcceptanceStatus(profileData.acceptance_status);
      }
      setLoading(false);
    }

    fetchUserData();
  }, []);

  // Logout function: sign out, then redirect to main page
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");
    const supabase = createBrowser();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      setLogoutError(error.message);
      setIsLoggingOut(false);
    } else {
      // Redirect to main page after sign-out
      router.push("/");
      // Optionally force a full reload if your Navbar state doesn't update automatically:
      // window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading status...</p>
      </div>
    );
  }

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
            Back to main site <span>➜</span>
          </Link>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-8 py-4 border border-[#1D2640] text-[#1D2640] rounded-full hover:bg-[#1D2640] hover:text-white transition text-xl"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
        {logoutError && (
          <p className="text-red-500 text-sm ml-4">{logoutError}</p>
        )}
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
            {userId}
          </p>
        </div>

        {/* Right Section: Acceptance Status */}
        <div className="bg-[#f8f9fc] p-16 rounded-2xl shadow-xl flex flex-col justify-center items-center w-full max-w-5xl">
          <p className="text-4xl font-semibold text-[#1D2640] text-center">
            Your acceptance status is {acceptanceStatus || "Pending"}
          </p>
          <p className="text-gray-600 mt-6 text-center text-xl">
            Once your application is reviewed, we will email you, or you can
            view your status here.
          </p>
          {/* Status Card */}
          <div className="mt-10 bg-white px-12 py-8 rounded-2xl shadow-lg text-center">
            <p className="text-3xl font-bold">
              Status:{" "}
              <span className="text-[#1D2640]">
                {acceptanceStatus || "Pending"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
