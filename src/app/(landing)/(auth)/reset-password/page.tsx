'use client';

import { useState } from "react";
import { createBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async () => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setMessage("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);
        setMessage("");
        const supabase = createBrowser();

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setMessage(error.message || "An error occurred while resetting the password.");
        } else {
            setMessage("Password reset successful! Redirecting to login...");
            setTimeout(() => router.push("/(landing)/(auth)/login"), 2000);
        }

        setLoading(false);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl my-20">Reset Password</h1>
            <div className="w-full max-w-md">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mt-4">
                    Confirm New Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                    onClick={handlePasswordReset}
                    disabled={loading}
                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
                {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    );
}
