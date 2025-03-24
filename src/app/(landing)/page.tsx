"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { dynaPuff } from "@/assets/fonts";

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
import Seeyou from "./_components/seeyou";

import Schedule from "@/app/(landing)/_components/schedule";

export default function Home() {
  return (
    <div
      className={`relative`}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/seeYou.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      {
        /* <Navbar />
      <Hero />
      <OceanWaves>
        <TracksPage />
        <Schedule />
        <Sponsors />
        <Prizes />
        <Stats />
        <FAQ />
        <TeamsComponent />
        <Footer />
      </OceanWaves>
      <Analytics /> */
        <div className={cn("content-container", dynaPuff.className)}>
          <h1 className="content-title">BeachHacks 9.0 Coming Soon...</h1>
          <p
            className={cn(
              "content-description font-semibold",
              dynaPuff.className
            )}
          >
            See you on 2026!
          </p>
        </div>
      }
    </div>
  );
}
