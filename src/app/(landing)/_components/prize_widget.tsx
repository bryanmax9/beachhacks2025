import { StaticImageData } from "next/image";
import Image  from "next/image";

interface PrizeWidgetProps {
    name: string;
    image: StaticImageData;
}
export default function PrizeWidget({name, image}: PrizeWidgetProps) {
    return(
        <div>
            <Image 
                src={image}
                alt="prize pic"
                width={150}
                height={150}
            />
            <p className="italic">{name}</p>
        </div>
    )
}