
import red_fish from "../../../../public/red_fish.png"
import star_fish from "../../../../public/star_fish.png"
import "./prizes.css"
import Image from "next/image"
export default function Prizes() {
    return (
        <div id="prizes" className="relative flex items-center flex-col justify-center align-middle w-full h-[60vh]">
            <h2 className="text-3xl font-bold mb-4 text-blue-900 bg-white bg-opacity-90 p-2 shadow-xl rounded-xl w-fit">Prizes (Coming soon!)</h2>
            {/* star fish container to scale on mobile */}
            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 bottom-4 md:left-10 left-5 floating-fish">
                <Image
                    src={star_fish}
                    alt="star_fish"
                    layout="fill"
                    objectFit="fill"
                />
            </div>
            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 md:top-10 top-80 md:right-10 right-4 floating-fish">
                <Image
                    src={red_fish}
                    alt="red_fish"
                    layout="fill"
                    objectFit="fill"
                />
            </div>
            <div className="flex flex-wrap md:px-28  align-middle items-center justify-center md:flex-row flex-col md:gap-x-14 gap-y-5 mt-5">
            </div>
        </div>
    )
}
