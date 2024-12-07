
"use server"

import {createServer} from "@/lib/supabase/server";
import {signup_schema, signupTypes} from "@/lib/schemas/user-signup";
import {signin_schema, signInTypes} from "@/lib/schemas/user-signin";
import {validateFields} from "@/lib/utils";

export const signup_action = async (signup_data: signupTypes) => {
    validateFields(signup_schema, signup_data);

    const supabase = await createServer();

    const { error } = await supabase.auth.signUp({
        email: signup_data.email,
        password: signup_data.password,
        options: {
            data: {
                first_name: signup_data.firstName,
                last_name: signup_data.lastName,
                phone: signup_data.phoneNumber,
                role: "HACKER"
            }
        }
    });

    if (error){
        return {
            success: false,
            message: error.message
        };
    }

    return {
        success: true,
        message: "User has been created."
    }

}

export const signin_action = async (signInData: signInTypes) => {
    validateFields(signin_schema, signInData);

    const supabase = await createServer();

    const {error} = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
    })

    if (error) {
        return {
            success: false,
            message: error.message
        }
    }

    return {
        success: true,
        message: "User has been signed in.",
    }

}