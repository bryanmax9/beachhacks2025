import Hero from "@/app/(landing)/_components/hero";
import Prizes from "./_components/prizes";
import Teams from "./_components/teams";
export default function Home() {
  return (
    <div>
      <Hero />
      <div className="h-[200vh] flex items-center justify-center text-lg">
      </div>
      <Prizes/>
      <Teams/>
    </div>
  );
}
