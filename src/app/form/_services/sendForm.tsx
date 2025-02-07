import { ApplicationFormTypes } from "../_components/ApplicationForm";
import { createBrowser } from "@/lib/supabase/client";

export const uploadResume = async (resume: File, userId: string) => {
  const supabase = createBrowser();

  // Upload resume to Supabase storage
  const { data, error } = await supabase.storage
    .from("resumes") // Bucket name
    .upload(`${userId}/${resume.name}`, resume, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Resume Upload Error:", error);
    return null; // Return null if upload fails
  }

  // Get the public URL for the uploaded file
  const { data: fileUrlData } = supabase.storage
    .from("resumes")
    .getPublicUrl(`${userId}/${resume.name}`);
  return fileUrlData?.publicUrl; // Return file URL
};

export const sendForm = async (formData: ApplicationFormTypes) => {
  const supabase = createBrowser();

  // Fetch authenticated user
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user?.id) {
    console.error("Error fetching user or user not authenticated:", userError);
    return;
  }
  const userId = user.user.id;

  // Upload resume first and get the URL
  let resumeUrl = "testing"; // Default value
  if (formData.resume.length > 0) {
    const uploadedUrl = await uploadResume(formData.resume[0], userId);
    if (uploadedUrl) resumeUrl = uploadedUrl;
  }

  // Insert form data into Supabase
  const { data, error } = await supabase.from("forms").insert({
    user_id: userId,
    school: formData.school,
    emergency_contact: formData.emergency_contact,
    why_interested: formData.why_interested,
    experience: formData.experience,
    have_team: formData.have_team === "yes",
    age: formData.age,
    graduation_year: formData.graduation_year,
    resume_path: resumeUrl, // Store resume URL instead of "testing"
  });

  if (error) {
    console.error("Database Insert Error:", error);
    return;
  }

  console.log("Form submitted successfully:", data);
};
