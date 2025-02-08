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

export default function Home() {
  // <3
  return (
    <div className={`relative`}>
      <Navbar />
      <Hero />
      <OceanWaves>
        <TracksPage />
        <Sponsors />
        <Prizes />
        <Stats />
        <FAQ />
        <TeamsComponent />
        <Footer />
      </OceanWaves>
    </div>
  );
}
