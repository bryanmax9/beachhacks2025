import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { inter } from "@/assets/fonts";
import Navbar from "@/app/(landing)/_components/navbar";

export const metadata: Metadata = {
  title: "BeachHacks 2025",
  description: "beach hacks hackathon for 2025",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Happy+Monkey&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("antialiased", inter.className)}>
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
