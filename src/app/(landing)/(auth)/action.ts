
"use server"

import {createServer} from "@/lib/supabase/server";
import {signup_schema, signupTypes} from "@/lib/schemas/user-signup";
import {signin_schema, signInTypes} from "@/lib/schemas/user-signin";
import {validateFields} from "@/lib/utils";
import { redirect } from "next/navigation";

export const signup_action = async (signup_data: signupTypes, origin: string) => {
    validateFields(signup_schema, signup_data);

    const supabase = await createServer();

    const { error, data } = await supabase.auth.signUp({
        email: signup_data.email,
        password: signup_data.password,
        options: {
            // emailRedirectTo: `${origin}/application`,
            data: {
                first_name: signup_data.firstName,
                last_name: signup_data.lastName,
                phone: signup_data.phoneNumber,
                role: signup_data.role 
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
        message: data
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

export async function logoutAction(){
    const supabase = await createServer();
    const { error } = await supabase.auth.signOut();

    if (error){
        return { success: false, message: "Something went wrong" }
    }

    redirect("/");
}