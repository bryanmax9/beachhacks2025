import TeamWidget from "./team_widget"
import green_fish from "../../../../public/green_fish.png"
import Image from "next/image"
import star_fish from "../../../../public/star_fish.png"
import jelly_fish from "../../../../public/jelly_fish.png"
export default function TeamsComponent() {
    return(
        <div className="relative flex flex-col justify-center align-middle items-center w-full mt-20 pb-20">
            <h2 className="text-3xl font-bold mb-4 text-blue-900 bg-white bg-opacity-90 p-2 shadow-xl rounded-xl w-fit">Our Team</h2>
            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 bottom-36 md:right-10 right-5 floating-fish">
            <Image 
            src={star_fish}
            alt="star_fish"
            layout="fill"
            objectFit="fill"
            />
            </div>
            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 md:top-5 md:left-20 left-5 floating-fish">
            <Image 
            src={jelly_fish}
            alt="jelly_fish"
            layout="fill"
            objectFit="fill"
            />
            </div>

            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 bottom-5 md:left-5 left-2 floating-fish">
            <Image 
            src={green_fish}
            alt="green_fish"
            layout="fill"
            objectFit="fill"
            />
            </div>

            <div className="flex flex-wrap md:px-28  align-middle items-center justify-center md:gap-x-14 gap-x-5 gap-y-5 mt-5 z-10">
                <TeamWidget name="Justine Cruz" role="ui/ux"/>
                <TeamWidget name="Vansh Patel" role="tech, ui/ux"/>
                <TeamWidget name="Praz" role="tech"/>
                <TeamWidget name="Bryan Tineo" role="tech"/>
                <TeamWidget name="Chuck Milton" role="tech"/>
                <TeamWidget name="Mekhi Hart" role="tech"/>
                <TeamWidget name="Ryan Tran" role="tech"/>
                <TeamWidget name="Joseph David" role="tech"/>
                <TeamWidget name="Noah Kim" role="tech, sponsorship"/>
                <TeamWidget name="Sroth Sinha" role="tech, sponsorship, logistics"/>
                <TeamWidget name="Keshav Jindal" role="sponsorship"/>
                <TeamWidget name="Krrish Kohli" role="sponsorship"/>
                <TeamWidget name="Kiet Nguyen" role="sponsorship"/>
                <TeamWidget name="Aditya Thakkar" role="sponsorship"/>
                <TeamWidget name="Preston Huynh" role="sponsorship"/>
                <TeamWidget name="Tiago Borges" role="sponsorship, logistics"/>
                <TeamWidget name="Winston Ta" role="sponsorship, logistics"/>
                <TeamWidget name="Thien Phu Quach" role="sponsorship, logistics"/>
                <TeamWidget name="Krisha" role="logistics"/>
                <TeamWidget name="Melissa" role="logistics"/>
                <TeamWidget name="Arnav" role="logistics"/>
                <TeamWidget name="Mahdi" role="logistics"/>
                <TeamWidget name="Cole Hartman" role="logistics"/>
                <TeamWidget name="Nathan Mai" role="logistics"/>
            </div>
        </div>
    )
}
