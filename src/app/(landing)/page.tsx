
import Hero from "@/app/(landing)/_components/hero";
import OceanWaves from "@/components/ocean-waves";
import TracksPage from "@/app/(landing)/_components/tracks";
import Sponsors from "@/app/(landing)/_components/sponsors";

export default function Home() {

    return (
        <div>
            <Hero/>

            <OceanWaves>
                <TracksPage />
                <Sponsors />
                {/*<Prizes />*/}
            </OceanWaves>
        </div>
    );

}
