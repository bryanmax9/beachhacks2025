"use client";
import { useForm } from "react-hook-form";
import { sendForm } from "../_services/sendForm";
import styles from "./ApplicationForm.module.css"; // Import CSS module

export interface ApplicationFormTypes {
  school: string;
  emergency_contact: string;
  why_interested: string;
  experience: number;
  have_team: string;
  age: number;
  graduation_year: number;
  resume: File[];
}

export default function ApplicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormTypes>({ mode: "onBlur" }); // Validate on blur

  const onSubmit = async (data: ApplicationFormTypes) => {
    if (!data.resume || data.resume.length === 0) {
      alert("Please upload your resume before submitting.");
      return;
    }
    await sendForm(data);
    alert("Form submitted successfully!");
    reset(); // Reset form after successful submission
  };

  return (
    <div className={styles.background}>
      {/* Bubble Elements */}
      {[...Array(15)].map((_, i) => (
        <div key={i} className={styles.bubble}></div>
      ))}

      <div className={styles.formContainer}>
        {/* Styled Title (Matching "Our Sponsors" Style) */}
        <div className={styles.formTitle}>
          <h2>Application Form</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* School */}
          <div className={styles.formGroup}>
            <label htmlFor="school">School</label>
            <input
              id="school"
              type="text"
              {...register("school", { required: "School is required" })}
              placeholder="CSULB"
            />
            {errors.school && (
              <span className={styles.error}>{errors.school.message}</span>
            )}
          </div>

          {/* Emergency Contact */}
          <div className={styles.formGroup}>
            <label htmlFor="emergency_contact">Emergency Contact</label>
            <input
              id="emergency_contact"
              type="text"
              {...register("emergency_contact", {
                required: "Emergency contact is required",
              })}
            />
            {errors.emergency_contact && (
              <span className={styles.error}>
                {errors.emergency_contact.message}
              </span>
            )}
          </div>

          {/* Why Interested */}
          <div className={styles.formGroup}>
            <label htmlFor="why_interested">Why are you interested?</label>
            <input
              id="why_interested"
              type="text"
              {...register("why_interested", {
                required: "This field is required",
              })}
            />
            {errors.why_interested && (
              <span className={styles.error}>
                {errors.why_interested.message}
              </span>
            )}
          </div>

          {/* Experience */}
          <div className={styles.formGroup}>
            <label htmlFor="experience">Experience</label>
            <input
              id="experience"
              type="number"
              {...register("experience", {
                required: "Experience is required",
                min: { value: 0, message: "Must be 0 or more" },
              })}
            />
            {errors.experience && (
              <span className={styles.error}>{errors.experience.message}</span>
            )}
          </div>

          {/* Have a Team? */}
          <div className={styles.formGroup}>
            <label htmlFor="have_team">Do you have a team?</label>
            <div className={styles.radioGroup}>
              <input
                id="have_team_yes"
                type="radio"
                {...register("have_team", {
                  required: "Please select an option",
                })}
                value="yes"
              />
              <label htmlFor="have_team_yes">Yes</label>

              <input
                id="have_team_no"
                type="radio"
                {...register("have_team", {
                  required: "Please select an option",
                })}
                value="no"
              />
              <label htmlFor="have_team_no">No</label>
            </div>
            {errors.have_team && (
              <span className={styles.error}>{errors.have_team.message}</span>
            )}
          </div>

          {/* Age */}
          <div className={styles.formGroup}>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 10, message: "Must be at least 10" },
              })}
            />
            {errors.age && (
              <span className={styles.error}>{errors.age.message}</span>
            )}
          </div>

          {/* Graduation Year */}
          <div className={styles.formGroup}>
            <label htmlFor="graduation_year">Graduation Year</label>
            <input
              id="graduation_year"
              type="number"
              {...register("graduation_year", {
                required: "Graduation year is required",
                min: { value: 2000, message: "Enter a valid year" },
              })}
            />
            {errors.graduation_year && (
              <span className={styles.error}>
                {errors.graduation_year.message}
              </span>
            )}
          </div>

          {/* Resume Upload */}
          <div className={styles.formGroup}>
            <label htmlFor="resume">Resume</label>
            <input
              id="resume"
              type="file"
              {...register("resume", { required: "Resume upload is required" })}
            />
            {errors.resume && (
              <span className={styles.error}>{errors.resume.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
