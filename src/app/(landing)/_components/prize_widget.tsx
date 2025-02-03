
import { StaticImageData } from "next/image";
import Image  from "next/image";

interface PrizeWidgetProps {
    name: string;
    image: StaticImageData;
}
export default function PrizeWidget({name, image}: PrizeWidgetProps) {
    return(
        <div className="flex flex-col items-center align-middle justify-center">
            {/* image container */}
            <div className="w-48 h-48 relative">
                <Image
                    src={image}
                    alt="prize pic"
                    layout="fill"
                    objectFit="fill"
                    className="absolute"
                />
            </div>
            <p className="text-xl font-bold mb-4 text-blue-900 bg-white bg-opacity-90 p-2 shadow-xl rounded-xl w-fit" >{name}</p>
        </div>
    )
}