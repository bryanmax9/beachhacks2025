import supabase from "@/lib/supabase/supabase"

export const updateUserAcceptanceStatus = async(uuid: string, status: string) => {
    // uuid: the unique id of the user you are updating the acceptance status of
    // status: must be ACCEPTED, DECLINED, or WAITLISTED
    const myid = (await supabase.auth.getUser()).data.user?.id;
    console.log("myid",myid);
    const {data,error} = await supabase
    .from("profiles")
    .update({
        "acceptance_status":status
    })
    .eq("id", uuid)
    .select("*")
    .single();
    // print the user id of the person you just accepted/declined/waitlisted
    console.log(data);
    if(error) console.log(error);

}