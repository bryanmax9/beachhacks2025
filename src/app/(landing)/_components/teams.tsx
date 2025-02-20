import "./teams.css";
import TeamWidget from "./team_widget";
import Image from "next/image";
import green_fish from "../../../../public/green_fish.png";
import star_fish from "../../../../public/star_fish.png";
import jelly_fish from "../../../../public/jelly_fish.png";
export default function TeamsComponent() {
  return (
    <div
      id="team"
      className="relative flex flex-col justify-center items-center w-full mt-20 pb-60 teams-section"
    >
      {/* Title */}
      <h2 className="teams-heading text-4xl font-bold text-center mb-12 text-gray-800">
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
        <TeamWidget name="Vansh Patel" role="Tech, ui/ux" image="/vansh.jpg" />
        <TeamWidget name="Praz" role="Tech" image="/praz.jpg" />
        <TeamWidget name="Bryan Tineo" role="Tech" image="/bryan.png" />
        <TeamWidget name="Chuck Milton" role="Tech" image="/charles.jpg" />
        <TeamWidget name="Mekhi Hart" role="Tech" image="/mekhi.jpg" />
        <TeamWidget name="Ryan Tran" role="Tech" image="/ryan.jpg" />
        <TeamWidget name="Joseph David" role="Tech" image="/joseph.jpg" />
        <TeamWidget
          name="Noah Kim"
          role="Tech, Sponsorship"
          image="/noah.jpg"
        />
        <TeamWidget
          name="Sroth Sinha"
          role="Tech, Sponsorship, Logistics"
          image="/sroth.png"
        />
        <TeamWidget name="Keshav Jindal" role="Sponsorship" image="/kesh.jpg" />
        <TeamWidget name="Krrish Kohli" role="Sponsorship" image="/krish.jpg" />
        <TeamWidget name="Kiet Nguyen" role="Sponsorship" image="/kiet.jpg" />
        <TeamWidget
          name="Tiago Borges"
          role="Sponsorship, Logistics"
          image="/tiago.png"
        />
        <TeamWidget
          name="Winston Ta"
          role="Sponsorship, Logistics"
          image="/winston.jpg"
        />
        <TeamWidget
          name="Thien Phu Quach"
          role="Sponsorship, Logistics"
          image="/phu.jpg"
        />
        <TeamWidget name="Krisha" role="Logistics" image="/Krisha.jpg" />
        <TeamWidget name="Arnav" role="Logistics" image="/arnav.jpg" />
      </div>
    </div>
  );
}