
'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {signup_schema, signupTypes} from "@/lib/schemas/user-signup";
import {signup_action} from "@/app/(landing)/(auth)/action";

export default function SignUpForm() {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
        watch
    } = useForm<signupTypes>({
        resolver: zodResolver(signup_schema)
    });

    const handle_signup = async (data: signupTypes) => {
        await signup_action(data);
        reset();
    };

    return (
        <form className={"space-y-6 font-semibold"} onSubmit={handleSubmit(handle_signup)}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold ">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        {...register("firstName")}
                        placeholder="John"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold ">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        {...register("lastName")}
                        placeholder="Doe"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor="role" className="block text-sm font-semibold ">
                    Role
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setValue("role", "HACKER")}
                        className={`px-4 py-2 rounded-md text-sm font-semibold ${
                            watch("role") === "HACKER" ? "bg-indigo-600 text-white" : "bg-white text-black"
                        }`}
                    >
                        HACKER
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue("role", "JUDGE")}
                        className={`px-4 py-2 rounded-md text-sm font-semibold ${
                            watch("role") === "JUDGE" ? "bg-indigo-600 text-white" : "bg-white text-black"
                        }`}
                    >
                        JUDGE
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue("role", "VOLUNTEER")}
                        className={`px-4 py-2 rounded-md text-sm font-semibold ${
                            watch("role") === "VOLUNTEER" ? "bg-indigo-600 text-white" : "bg-white text-black"
                        }`}
                    >
                        VOLUNTEER
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue("role", "MENTOR")}
                        className={`px-4 py-2 rounded-md text-sm font-semibold ${
                            watch("role") === "MENTOR" ? "bg-indigo-600 text-white" : "bg-white text-black"
                        }`}
                    >
                        MENTOR
                    </button>
                    <button
                        type="button"
                        onClick={() => setValue("role", "SPONSOR")}
                        className={`px-4 py-2 rounded-md text-sm font-semibold ${
                            watch("role") === "SPONSOR" ? "bg-indigo-600 text-white" : "bg-white text-black"
                        }`}
                    >
                        SPONSOR
                    </button>
                </div>
                {errors.role && (
                    <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-black">
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        {...register("phoneNumber")}
                        placeholder="+1 (123) 456-7890"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-black">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="you@example.com"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-black">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                        placeholder="********"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        placeholder="********"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
}