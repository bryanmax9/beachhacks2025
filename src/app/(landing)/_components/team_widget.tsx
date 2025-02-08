import Image from "next/image";

interface TeamWidgetProps {
  name: string;
  role: string;
  image: string;
}

export default function TeamWidget({ name, role, image }: TeamWidgetProps) {
  return (
    <div className="flex flex-col items-center bg-[#d1a564] text-center rounded-lg shadow-lg p-4 w-48 md:w-56 lg:w-64 transition-transform transform hover:scale-105">
      {/* Name */}
      <p className="text-lg font-bold text-blue-900 mb-2">{name}</p>

      {/* Image */}
      <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-yellow-500 flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          width={120}
          height={120}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Role */}
      <p className="text-sm text-black-600 italic mt-2">{role}</p>
    </div>
  );
}
