
import { StaticImageData } from "next/image";
import Image  from "next/image";

interface PrizeWidgetProps {
    name: string;
    image: StaticImageData;
}
export default function PrizeWidget({name, image}: PrizeWidgetProps) {
    return(
        <div>
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
            <p className="italic text-center">{name}</p>
        </div>
    )
}