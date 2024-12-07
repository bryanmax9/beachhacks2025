import { z } from "zod";
export const signin_schema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email format" })
        .refine((email) => {
            return email.trim().endsWith(".edu")
        }, { message: "Only .edu email addresses are allowed" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
});

export type signInTypes = z.infer<typeof signin_schema>

