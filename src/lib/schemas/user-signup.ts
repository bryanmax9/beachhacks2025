
import { z } from "zod";

export const signup_schema = z.object({
    firstName: z
        .string()
        .min(2, "First name should be longer")
        .max(10, "First name should be less")
        .trim(),
    lastName: z
        .string()
        .min(2, "Last name should be longer")
        .max(10, "Last name should be less")
        .trim(),
    phoneNumber: z
        .string()
        .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    email: z
        .string()
        .email({ message: "Invalid email format" })
        .refine((email) => {
            return email.trim().endsWith(".edu")
        }, { message: "Only .edu email addresses are allowed" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(64, { message: "Password must be no more than 64 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
            message: "Password must contain at least one special character"
        }),
    confirmPassword: z.string(),
    role: z.enum(['HACKER', 'JUDGE', 'VOLUNTEER', 'MENTOR', 'SPONSOR'], {
        message: "Invalid role selection"
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"]
});


export type signupTypes = z.infer<typeof signup_schema>