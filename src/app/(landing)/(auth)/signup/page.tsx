
import SignUpForm from "@/app/(landing)/(auth)/_components/signup_form";
import OceanWavesNoSand from "@/components/ocean-waves-no-sand";
import {dynaPuff} from "@/assets/fonts";
import {cn} from "@/lib/utils";
export default function SignUpPage() {
    return (
        <OceanWavesNoSand>
            <div className={cn("flex flex-col items-center justify-center h-screen", dynaPuff.className)}>
                <div className="relative bg-white text-black border-8 p-4 rounded-xl">
                    <SignUpForm />
                </div>
            </div>
        </OceanWavesNoSand>
    );
}
