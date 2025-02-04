
import Hero from "@/app/(landing)/_components/hero";
import OceanWaves from "@/components/ocean-waves";
import TracksPage from "@/app/(landing)/_components/tracks";
import Sponsors from "@/app/(landing)/_components/sponsors";
import Prizes from "./_components/prizes";
import Stats from "@/app/(landing)/_components/stats"
import TeamsComponent from "./_components/teams";

export default function Home() {

    return (
        <div>
            <Hero/>

            <OceanWaves>
                <TracksPage />
                <Sponsors />
                <Prizes />
                <Stats />
                <TeamsComponent/>
            </OceanWaves>
        </div>
    );

}
