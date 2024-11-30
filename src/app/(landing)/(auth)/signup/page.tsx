
'use client';
import SignUpForm from "./_components/signup_form";
import SignUpBanner from "./_components/banner";

export default function SignUpPage() {
    return (
        <>
        <div className="w-full flex items-center flex-col">
            <SignUpBanner/>
            <SignUpForm/>
        </div>
        </>
    )
}