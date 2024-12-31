import Hero from "@/app/(landing)/_components/hero";
import Prizes from "./_components/prizes";
export default function Home() {
  return (
    <div>
      <Prizes/>
      <Hero />
      <div className="h-[200vh] flex items-center justify-center text-lg">
        Scroll down to see the navbar change!
      </div>
    </div>
  );
}
