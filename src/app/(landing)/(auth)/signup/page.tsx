
import SignUpForm from "@/app/(landing)/(auth)/_components/signup_form";

export default function SignUpPage() {
    return (
        <div className="w-full flex items-center flex-col">
            <h1 className="text-4xl my-20">Sign Up</h1>
            <SignUpForm/>
        </div>
    )
}