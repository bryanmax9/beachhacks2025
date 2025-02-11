
"use server"

import {createServer} from "@/lib/supabase/server";
import {signup_schema, signupTypes} from "@/lib/schemas/user-signup";
import {signin_schema, signInTypes} from "@/lib/schemas/user-signin";
import {validateFields} from "@/lib/utils";
import { redirect } from "next/navigation";
import {getUserRole} from "@/middleware";
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

    return redirect("/form")

}

export const signin_action = async (signInData: signInTypes) => {
    validateFields(signin_schema, signInData);

    const supabase = await createServer();

    const {data ,error} = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
    })


    if (error) {
        return {
            success: false,
            message: error.message
        }
    }
    const userId = data?.user?.id;
    if (!userId) {
        return {
            success: false,
            message: "User not found."
        }
    }

    const res  = await getUserRole(userId);
    return {
        success: true,
        is_admin: res,
        message: "User has been signed in.",
    }

}

