"use client";

import React, { useEffect, useState } from "react";
import { updateUserAcceptanceStatus } from "@/(api)/userApplicationServices";
import { createBrowser } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function SetUserAcceptance() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const supabase = createBrowser();

  useEffect(() => {
    async function fetchProfiles() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, acceptance_status");
      if (error) {
        console.error("Error fetching profiles:", error);
      } else {
        setProfiles(data || []);
      }
    }
    fetchProfiles();
  }, []);

  const handleRowClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedProfile) return;
    await updateUserAcceptanceStatus(
      selectedProfile.id,
      selectedProfile.acceptance_status || "Pending"
    );
    console.log(selectedProfile.id, selectedProfile.acceptance_status);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-[#e6b877] px-8 py-5 shadow-md z-50">
        <div className="w-20 h-20">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-[#1D2640] text-xl flex items-center gap-3 hover:opacity-80 font-semibold"
          >
            Back to main site <span>➜</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center gap-16 max-w-8xl mx-auto px-12 lg:px-16 mt-28">
        {/* User Profiles List */}
        <div className="bg-white p-12 rounded-2xl shadow-xl flex flex-col w-full max-w-5xl">
          <p className="text-4xl font-semibold text-[#1D2640] text-center">
            User Profiles
          </p>
          <p className="text-gray-600 mt-4 text-center text-lg">
            Click a user to modify their acceptance status.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full mt-6 border-collapse">
              <thead>
                <tr className="bg-[#f8f9fc]">
                  <th className="border p-4">First Name</th>
                  <th className="border p-4">Last Name</th>
                  <th className="border p-4">ID</th>
                  <th className="border p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr
                    key={profile.id}
                    onClick={() => handleRowClick(profile)}
                    className="cursor-pointer hover:bg-gray-200"
                  >
                    <td className="border p-4">
                      {profile.first_name || "N/A"}
                    </td>
                    <td className="border p-4">{profile.last_name || "N/A"}</td>
                    <td className="border p-4">{profile.id || "N/A"}</td>
                    <td className="border p-4">
                      {profile.acceptance_status || "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Acceptance Status Form */}
        {selectedProfile && (
          <div className="bg-[#f8f9fc] p-14 rounded-2xl shadow-xl flex flex-col justify-center items-center w-full max-w-4xl">
            <p className="text-4xl font-semibold text-[#1D2640] text-center">
              Modify Acceptance Status
            </p>
            <p className="text-gray-600 mt-4 text-center text-lg">
              User: {selectedProfile.first_name || "N/A"}{" "}
              {selectedProfile.last_name || "N/A"}
            </p>
            <form
              className="flex flex-col items-center w-full max-w-md mt-8"
              onSubmit={handleSubmit}
            >
              {["ACCEPTED", "DECLINED", "WAITLISTED"].map((status) => (
                <label key={status} className="flex items-center gap-4 mt-6">
                  <input
                    type="radio"
                    value={status}
                    name="acceptance"
                    checked={selectedProfile.acceptance_status === status}
                    onChange={() =>
                      setSelectedProfile({
                        ...selectedProfile,
                        acceptance_status: status,
                      })
                    }
                  />
                  {status}
                </label>
              ))}
              <button
                className="mt-8 px-8 py-4 bg-[#1D2640] text-white rounded-full hover:opacity-80 transition text-xl"
                type="submit"
              >
                Update Status
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
