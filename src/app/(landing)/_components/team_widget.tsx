import Image, { StaticImageData } from "next/image";
interface TeamWidgetProps {
    name: string;
    role: string;
    image: StaticImageData;
}
export default function TeamWidget({name, role, image}: TeamWidgetProps) {
    return (
        <div>
        <Image 
            src={image}
            alt="team picture"
            height={150}
            width={150}
            className="hover:rotate-3 duration-100 rounded-2xl outline-4 outline outline-green-900"
        />
        <p className="text-center font-bold mt-5">{name}</p>
        <p className="italic text-center">{role}</p>
        </div>
    )
}