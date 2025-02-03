
import { cn } from "@/lib/utils";
import Link from "next/link";
import {dynaPuff} from "@/assets/fonts";

const ApplyButton = () => {
    return (
        <div className={cn("grayscale relative group", dynaPuff.className)}>
            {/* Main button */}
            <Link
                href="#"
                className={cn(
                    "relative tracking-widest inline-flex items-center justify-center",
                    "px-8 py-4 text-xl md:text-2xl font-bold",
                    "bg-gradient-to-r from-orange-400 to-yellow-300",
                    "text-white shadow-lg",
                    "rounded-full border-4 border-white",
                    "transform transition-all duration-300",
                    "hover:scale-105 hover:shadow-xl hover:from-orange-500 hover:to-yellow-400",
                    "active:scale-95",
                    "overflow-hidden"
                )}
            >
                <span className="relative z-10">Apply Now! 🌊</span>

                {/* Animated wave effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className={cn(
                        "absolute inset-0 bg-white/25",
                        "transform -skew-x-12 -translate-x-full",
                        "group-hover:animate-shine"
                    )} />
                </div>
            </Link>

        </div>
    );
};

export default ApplyButton;