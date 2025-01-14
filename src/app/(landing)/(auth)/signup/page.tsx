
import SignUpForm from "@/app/(landing)/(auth)/_components/signup_form";

export default function SignUpPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative bg-blue-400 border-blue-300 border-8 p-4 rounded-xl">
                <SignUpForm />
            </div>
        </div>
    );
}
