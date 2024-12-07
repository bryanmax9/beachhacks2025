
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signin_schema, signInTypes } from "@/lib/schemas/user-signin"
import { signin_action } from "@/app/(landing)/(auth)/action"
import Link from 'next/link'
import {Loader} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage() {

    const router = useRouter();
    const [loginError, setLoginError] = useState("");
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit
    } = useForm<signInTypes>({
        resolver: zodResolver(signin_schema)
    });

    const handleSignIn = async (data: signInTypes) => {

        const response = await signin_action(data);

        if (response.success) {
            console.log(response.message);
            router.push("/application");
        } else {
            setLoginError(response.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md flex flex-col">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4 flex-grow">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.edu"
                                {...register('email')}
                                className={errors.email ? 'border-red-500' : ''}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register('password')}
                                className={errors.password ? 'border-red-500' : ''}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full">
                            {isSubmitting && <Loader className={"animate-spin"}/> }
                            Sign In
                        </Button>
                    </form>

                    { loginError && (
                        <p className={"text-red-500 text-sm mt-1 text-center font-medium"}>{loginError}</p>
                    )}
                    <div className="mt-4 text-center">
                        <span>{"Don't have an account yet? "}</span>
                        <Link href="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}