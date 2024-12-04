
"use server"

import {createServer} from "@/lib/supabase/server";
import {signupTypes} from "@/lib/schemas/user-signup";

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