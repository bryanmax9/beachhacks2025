import Hero from "@/app/(landing)/_components/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div
        className="relative h-[200vh] flex items-center justify-center text-lg"
        style={{ backgroundColor: "#54b4c4" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute top-0 left-0 w-full"
        >
          <path
            fill="#ecbc7c"
            fillOpacity="1"
            d="M0,288L30,245.3C60,203,120,117,180,96C240,75,300,117,360,128C420,139,480,117,540,106.7C600,96,660,96,720,112C780,128,840,160,900,154.7C960,149,1020,107,1080,101.3C1140,96,1200,128,1260,170.7C1320,213,1380,267,1410,293.3L1440,320L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
        Scroll down to see the navbar change!
      </div>
    </div>
  );
}
