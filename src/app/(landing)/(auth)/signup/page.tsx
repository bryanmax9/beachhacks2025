
import SignUpForm from "@/app/(landing)/(auth)/_components/signup_form";
import OceanWavesNoSand from "@/components/ocean-waves-no-sand";
import {dynaPuff} from "@/assets/fonts";
import {cn} from "@/lib/utils";
import styles from "@/app/(landing)/_components/faq.module.css";
export default function SignUpPage() {
    return (
        <OceanWavesNoSand>
            <div className={cn("flex flex-col items-center justify-center h-screen", dynaPuff.className)}>
                <div className="relative bg-white text-black border-8 p-4 rounded-xl">
                    <SignUpForm />
                </div>
                <img src={'/red_fish.png'} className={`absolute z-[-1] animate-swim-across-components-red-fish`}/>
                <img src={'/green_fish.png'} className={`absolute top-2/3 z-[-1] animate-swim-across-components-green-fish`}/>
                <img src={'/red_fish.png'} className={`absolute top-1.5 z-[-1] animate-swim-across-components-red-fish`}/>
                {[...Array(20)].map((_, index) => (
                    <img
                        key={index}
                        src="/kelp.png"
                        className={`
            absolute z-[-10] object-contain 
            ${index % 2 === 0 ? styles.animateCoralSwayLeft : styles.animateCoralSwayRight}
        `}
                        style={{
                            height: `${Math.floor(Math.random() * 100) + 300}px`, // Random height between 300-400px
                            bottom: "-60px",
                            left: `${Math.floor(Math.random() * 90)}%`,           // Random left position (0-90%)
                            transform: `rotate(${Math.random() * 60 - 30}deg)`    // Random rotation between -30° to 30°
                        }}
                    />
                ))}

            </div>
        </OceanWavesNoSand>
    );
}
