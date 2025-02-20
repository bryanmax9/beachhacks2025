import TeamWidget from "./team_widget";
import Image from "next/image";
import green_fish from "../../../../public/green_fish.png";
import star_fish from "../../../../public/star_fish.png";
import jelly_fish from "../../../../public/jelly_fish.png";

export default function TeamsComponent() {
  return (
    <div
      id="team"
      className="relative flex flex-col justify-center items-center w-full mt-20 pb-60"
    >
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-blue-900 bg-white bg-opacity-90 p-3 shadow-xl rounded-xl">
        Our Team
      </h2>

      {/* Floating Fish Decorations */}
      <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 bottom-36 md:right-10 right-5 ryan-floating-fish">
        <Image src={star_fish} alt="star_fish" layout="fill" objectFit="fill" />
      </div>
      <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 md:top-5 md:left-20 left-5 ryan-floating-fish">
        <Image
          src={jelly_fish}
          alt="jelly_fish"
          layout="fill"
          objectFit="fill"
        />
      </div>
      <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 bottom-5 md:left-5 left-2 ryan-floating-fish">
        <Image
          src={green_fish}
          alt="green_fish"
          layout="fill"
          objectFit="fill"
        />
      </div>

      {/* Team Grid Layout */}
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl w-full px-4 z-10">
        <TeamWidget name="Justine Cruz" role="ui/ux" image="/justine.jpg" />
        <TeamWidget name="Vansh Patel" role="tech, ui/ux" image="/vansh.jpg" />
        <TeamWidget name="Praz" role="tech" image="/praz.jpg" />
        <TeamWidget name="Bryan Tineo" role="tech" image="/bryan.png" />
        <TeamWidget name="Chuck Milton" role="tech" image="/charles.jpg" />
        <TeamWidget name="Mekhi Hart" role="tech" image="/mekhi.jpg" />
        <TeamWidget name="Ryan Tran" role="tech" image="/ryan.jpg" />
        <TeamWidget name="Joseph David" role="tech" image="/joseph.jpg" />
        <TeamWidget
          name="Noah Kim"
          role="tech, sponsorship"
          image="/noah.jpg"
        />
        <TeamWidget
          name="Sroth Sinha"
          role="tech, sponsorship, logistics"
          image="/sroth.png"
        />
        <TeamWidget name="Keshav Jindal" role="sponsorship" image="/kesh.jpg" />
        <TeamWidget name="Krrish Kohli" role="sponsorship" image="/krish.jpg" />
        <TeamWidget name="Kiet Nguyen" role="sponsorship" image="/kiet.jpg" />
        <TeamWidget
          name="Tiago Borges"
          role="sponsorship, logistics"
          image="/tiago.png"
        />
        <TeamWidget
          name="Winston Ta"
          role="sponsorship, logistics"
          image="/winston.jpg"
        />
        <TeamWidget
          name="Thien Phu Quach"
          role="sponsorship, logistics"
          image="/phu.jpg"
        />
        <TeamWidget name="Krisha" role="logistics" image="/Krisha.jpg" />
        <TeamWidget name="Arnav" role="logistics" image="/arnav.jpg" />
      </div>
    </div>
  );
}
