'use client';

import { useState } from "react";
import { createBrowser } from "@/lib/supabase/client";

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
            redirectTo: `${window.location.origin}/(landing)/(auth)/reset-password`,
        });

        if (error) {
            setMessage(error.message || "An error occurred while sending the reset email.");
        } else {
            setMessage("A password reset email has been sent. Please check your inbox.");
        }

        setLoading(false);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl my-20">Forgot Password</h1>
            <div className="w-full max-w-md">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Enter your email address
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    onClick={handlePasswordReset}
                    disabled={loading}
                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? "Sending..." : "Send Reset Email"}
                </button>
                {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    );
}
