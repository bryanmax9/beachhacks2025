'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signin_schema, signInTypes } from "@/lib/schemas/user-signin"
import { signin_action } from "@/app/(landing)/(auth)/action"
import Link from 'next/link'
import { Loader } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
    const router = useRouter()
    const [loginError, setLoginError] = useState("")
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit
    } = useForm<signInTypes>({
        resolver: zodResolver(signin_schema)
    })

    const handleSignIn = async (data: signInTypes) => {
        const response = await signin_action(data)

        if (response.success) {
            console.log(response.message)
            router.push("/application")
        } else {
            setLoginError(response.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg flex flex-col">
                <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
                <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4 flex-grow">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.edu"
                            {...register('email')}
                            className={`mt-1 block w-full ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password')}
                            className={`mt-1 block w-full ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full flex justify-center items-center space-x-2"
                    >
                        {isSubmitting && <Loader className="animate-spin" />}
                        <span>Sign In</span>
                    </Button>
                </form>

                {loginError && (
                    <p className="text-red-500 text-sm mt-4 text-center font-medium">
                        {loginError}
                    </p>
                )}

                <div className="mt-6 text-center">
                    <span>Don&#39;t have an account yet? </span>
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}
