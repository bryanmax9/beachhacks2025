"use client";

import { useState } from "react";
import { createBrowser } from "@/lib/supabase/client";
import OceanWavesNoSand from "../../../../components/ocean-waves-no-sand";
import { dynaPuff } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      setMessage("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    const supabase = createBrowser();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage(
        error.message || "An error occurred while sending the reset email."
      );
    } else {
      setMessage(
        "A password reset email has been sent. Please check your inbox."
      );
    }

    setLoading(false);
  };

  return (
    <OceanWavesNoSand>
      <div
        className={cn(
          `flex justify-center items-center min-h-screen`,
          dynaPuff.className
        )}
      >
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl flex flex-col">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Forgot Password
          </h2>
          <div className="space-y-4 flex-grow">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <Button
              onClick={handlePasswordReset}
              disabled={loading}
              className="mt-4 w-full flex justify-center items-center space-x-2"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Send Reset Email</span>
              )}
            </Button>
            {message && (
              <p className="mt-4 text-sm text-gray-700 text-center">
                {message}
              </p>
            )}
          </div>
          <div className="mt-6 text-center">
            <Link href="/login" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <img
        src="/red_fish.png"
        className="absolute z-[-1] animate-swim-across-components-red-fish"
      />
      <img
        src="/red_fish.png"
        className="absolute top-2/3 z-[-1] animate-swim-across-components-red-fish"
      />
      <img
        src="/green_fish.png"
        className="absolute top-1.5 z-[-1] animate-swim-across-components-green-fish transform"
      />
    </OceanWavesNoSand>
  );
}
