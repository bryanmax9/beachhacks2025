import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { inter } from "@/assets/fonts";

export const metadata: Metadata = {
  title: "BeachHacks 2025 - CSULB",
  description: "CSULB Beach hacks hackathon for 2025",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Dynapuff&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.ico" />
        <title>BeachHacks 2025 - CSULB</title>
      </head>

      <body className={cn("antialiased", inter.className)}>
        <main>{children}</main>
      </body>
    </html>
  );
}
