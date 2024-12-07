
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function validateFields<T extends z.ZodType>(
    schema: T,
    data: z.infer<T>
): { success: true } | { success: false, message: Record<string, string[]> } {
  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const cleanedErrors: Record<string, string[]> = {};

    Object.keys(fieldErrors).forEach(key => {
      const errors = fieldErrors[key];
      if (errors && errors.length > 0) {
        cleanedErrors[key] = errors;
      }
    });

    return {
      success: false,
      message: cleanedErrors
    };
  }

  return { success: true };
}