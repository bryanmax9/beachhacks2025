import TeamWidget from "./team_widget"
import pfp from "../_images/profilepic.png"
import green_fish from "../../../../public/green_fish.png"
import Image from "next/image"
import star_fish from "../../../../public/star_fish.png"
import jelly_fish from "../../../../public/jellyfish.png"
export default function TeamsComponent() {
    return(
        <div className="relative">
            <h1 className="font-bold text-5xl text-center">Teams</h1>
            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 bottom-36 md:right-10 right-5">
            <Image 
            src={star_fish}
            alt="star_fish"
            layout="fill"
            objectFit="fill"
            />
            </div>
            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 md:bottom-36 bottom-[-150px] md:left-10 left-5">
            <Image 
            src={jelly_fish}
            alt="jelly_fish"
            layout="fill"
            objectFit="fill"
            />
            </div>

            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 md:top-20 top-80 md:left-5 left-2">
            <Image 
            src={green_fish}
            alt="green_fish"
            layout="fill"
            objectFit="fill"
            />
            </div>

            <div className="flex flex-wrap md:px-28  align-middle items-center justify-center md:flex-row flex-col md:gap-x-14 gap-y-5 mt-5">
                <TeamWidget name="first last" role="dev" image={pfp}/>
                <TeamWidget name="first last" role="dev" image={pfp}/>
                <TeamWidget name="first last" role="dev" image={pfp}/>
                <TeamWidget name="first last" role="dev" image={pfp}/>
                <TeamWidget name="first last" role="dev" image={pfp}/>
                <TeamWidget name="first last" role="dev" image={pfp}/>
            </div>
        </div>
    )
}