
import {ReactNode} from "react";

interface MainDashboardProps {
    children: ReactNode
}

export default function MainDashboard({ children }: MainDashboardProps){

    // if hacker then show the application
    // if other then just show the qr
    // if admin then /admin

    return (
        <>
            {children}
        </>
    )

}