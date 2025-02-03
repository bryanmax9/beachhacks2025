
import PrizeWidget from "./prize_widget"
import red_fish from "../../../../public/red_fish.png"
import star_fish from "../../../../public/star_fish.png"
import Image from "next/image"
export default function Prizes() {
    return (
        <div className="relative">
            <h1 className="font-bold text-5xl text-center">Prizes</h1>
            {/* star fish container to scale on mobile */}
            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 bottom-20 md:left-10 left-5">
                <Image
                    src={star_fish}
                    alt="star_fish"
                    layout="fill"
                    objectFit="fill"
                />
            </div>
            <div className="md:w-32 w-24 md:h-32 h-24 absolute z-10 md:top-10 top-80 md:right-10 right-5">
                <Image
                    src={red_fish}
                    alt="red_fish"
                    layout="fill"
                    objectFit="fill"
                />
            </div>
            <div className="flex flex-wrap md:px-28  align-middle items-center justify-center md:flex-row flex-col md:gap-x-14 gap-y-5 mt-5">
                <PrizeWidget name="iphone" image={star_fish}/>
                <PrizeWidget name="$100000" image={star_fish}/>
                <PrizeWidget name="new car" image={star_fish}/>
                <PrizeWidget name="a house" image={star_fish}/>
                <PrizeWidget name="tuition paid" image={star_fish}/>
            </div>
        </div>
    )
}
