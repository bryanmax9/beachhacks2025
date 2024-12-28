
import type {Metadata} from "next";
import "../globals.css";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {inter} from "@/assets/fonts";

export const metadata: Metadata = {
    title: "BeachHacks 2025",
    description: "beach hacks hackathon for 2025",
};

interface RootLayoutProps {
    readonly children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={cn("antialiased", inter.className)}>
                {children}
            </body>
        </html>
    );
}
