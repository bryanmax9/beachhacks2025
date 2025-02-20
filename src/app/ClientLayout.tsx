"use client";

import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthProvider";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
