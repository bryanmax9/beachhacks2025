import { ApplicationFormTypes } from "../_components/ApplicationForm";
import { createBrowser } from "@/lib/supabase/client";

export const uploadResume = async(resume: File) => {
    const supabase = createBrowser();
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if(userId==null) return;
    const { data, error } = await supabase.storage
        .from('resumes') // Bucket name
        .upload(`${userId}/${resume.name}`, resume, {
            cacheControl: '3600',
            upsert: true, 
        });
    if(error) console.log(error);

}
export const sendForm = async (formData: ApplicationFormTypes) => {
    const supabase = createBrowser();
    let haveTeam = false;
    if(formData.have_team=="yes") haveTeam=true;

    const userId = (await supabase.auth.getUser()).data.user?.id;
    console.log(userId);
    const { data, error} = await supabase
    .from("forms")
    .insert({
        "user_id": userId,
        "school": formData.school,
        "emergency_contact": formData.emergency_contact,
        "why_interested": formData.why_interested,
        "experience": formData.experience,
        "have_team": haveTeam, 
        "age": formData.age,
        "graduation_year": formData.graduation_year,
        "resume_path": "testing"
    })
    if(error) console.log(error);

    await uploadResume(formData.resume[0]);
}