"use client";
import { useEffect, useState } from "react";

import Hero from "@/app/(landing)/_components/hero";
import OceanWaves from "@/components/ocean-waves";
import TracksPage from "@/app/(landing)/_components/tracks";
import Sponsors from "@/app/(landing)/_components/sponsors";
import Prizes from "./_components/prizes";
import Stats from "@/app/(landing)/_components/stats";
import TeamsComponent from "./_components/teams";
import FAQ from "@/app/(landing)/_components/faq";
import Navbar from "@/app/(landing)/_components/navbar";
import Footer from "@/app/(landing)/_components/footer";
// import { redirect } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

import Schedule from "@/app/(landing)/_components/schedules";

export default function Home() {
  return (
    <div className={`relative`}>
      <Navbar />
      <Hero />
      <OceanWaves>
        {/* <TracksPage /> */}
        <Schedule />
        <TracksPage />
        <Sponsors />
        <Prizes />
        <Stats />
        <FAQ />
        <TeamsComponent />
        <Footer />
      </OceanWaves>
      <Analytics />
    </div>
  );
}
