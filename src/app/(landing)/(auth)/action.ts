
"use server"

import {createServer} from "@/lib/supabase/server";
import {signupTypes} from "@/lib/schemas/user-signup";
import {signInTypes} from "@/lib/schemas/user-signin";

export const signup_action = async (signup_data: signupTypes) => {

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
        console.log(error);
    }

    return {
        success: true,
        message: "User has been created."
    }

}

export const signin_action = async (signInData: signInTypes) => {
    const supabase = await createServer();

    const {error} = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
    })

    if (error){
        console.log(error);
    }

    return{
        success: true,
        message: "User has been signed in.",
        user_email: signInData.email, // You can include user data if needed
    }

}