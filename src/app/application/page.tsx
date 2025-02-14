
"use client";

import {useTransition} from "react";
import {Button} from "@/components/ui/button";
import {logoutAction} from "@/app/(landing)/(auth)/action";
import ApplicationForm from "@/app/application/_components/ApplicationForm";

export default function ApplicationPage() {

    const [isPending, startTransition] = useTransition();

    const logoutHandler = () => {
        startTransition(async () => {
            const { success, message } = await logoutAction();
            if (!success){
                console.log(message); // can add a toast later if you want
            }
        })
    }

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Logout button stays in the top right */}
            <div className="absolute top-2 right-2 z-10">
                <Button
                    disabled={isPending}
                    onClick={logoutHandler}
                    className={isPending ? "animate-pulse" : ""}>
                    {isPending ? "Logging out.." : "Logout"}
                </Button>
            </div>

            {/* Ensure ApplicationForm is visible */}
            <div className="flex-1 z-0">
                <ApplicationForm />
            </div>
        </div>

    );
}

