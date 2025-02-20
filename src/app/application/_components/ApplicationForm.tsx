
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { sendForm } from "@/app/application/_services/sendForm";
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
  food_allergies: string;
}

export default function ApplicationForm() {

  const [mounted, setMounted] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ApplicationFormTypes>({ mode: "onBlur" });

  const [schools, setSchools] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Track user input

  useEffect(() => {
    async function fetchSchools() {
      if (searchTerm.length < 3) return; // Avoid fetching for short queries

      setIsLoading(true);
      try {
        const API_KEY = "qgPihr8fLfbr6derE4g0YxJAhc4xbkia1lQFwgeE";
        const response = await fetch(
          `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${API_KEY}&fields=school.name&per_page=20&school.name=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await response.json();

        if (data.results) {
          const schoolOptions = data.results.map(
            (school: { "school.name": string }) => ({
              label: school["school.name"],
              value: school["school.name"],
            })
          );
          setSchools(schoolOptions);
        }
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setIsLoading(false);
      }
    }

    const debounceFetch = setTimeout(fetchSchools, 400);
    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  // mounting form only in client because of document error, ssr contains no document
  useEffect(() => {
    setMounted(true);
  }, [])
  const onSubmit = async (data: ApplicationFormTypes) => {
    if (!data.resume || data.resume.length === 0) {
      alert("Please upload your resume before submitting.");
      return;
    }

    console.log("Submitting Data:", JSON.stringify(data, null, 2)); // ✅ Ensures all fields are logged

    reset();
    await sendForm(data);
  };

  return (
    <div className={styles.background}>
      {/* Bubble Elements */}
      {[...Array(15)].map((_, i) => (
        <div key={i} className={styles.bubble}></div>
      ))}

      <div className={styles.formContainer}>
        {/* Styled Title */}
        <div className={styles.formTitle}>
          <h2>Application Form</h2>
        </div>

        { mounted ? (
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              {/* School Selection */}
              <div className={styles.formGroup}>
                <label htmlFor="school">School</label>
                <Controller
                    name="school"
                    control={control}
                    rules={{ required: "School is required" }}
                    render={({ field }) => (
                        <div style={{ position: "relative", zIndex: 9999999 }}>
                          {/* Input Field for Users to Type Their School */}
                          <input
                              type="text"
                              value={field.value || ""}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                setSearchTerm(e.target.value); // ✅ Update searchTerm to fetch schools
                              }}
                              placeholder="Type your school"
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                color: "white",
                                outline: "none",
                              }}
                          />

                          {/* Dropdown for Selecting Schools */}
                          <Select
                              value={
                                  schools.find((option) => option.value === field.value) ||
                                  null
                              }
                              options={schools}
                              isSearchable
                              isLoading={isLoading}
                              placeholder="Or type & select from the list"
                              noOptionsMessage={() => "No schools found"}
                              onInputChange={(value, { action }) => {
                                if (action === "input-change") {
                                  setSearchTerm(value);
                                }
                              }}
                              onChange={(selected) => field.onChange(selected?.value)}
                              menuPortalTarget={document.body} // ✅ Fix dropdown z-index issue
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                                  color: "white",
                                  border: "2px solid rgba(255, 255, 255, 0.3)",
                                  borderRadius: "8px",
                                  padding: "5px",
                                  zIndex: 999999,
                                  position: "relative",
                                  pointerEvents: "auto",
                                }),
                                menu: (base) => ({
                                  ...base,
                                  background: "rgba(0, 0, 0, 0.9)",
                                  color: "white",
                                  zIndex: 9999999, // ✅ Ensures dropdown is above everything
                                  position: "absolute",
                                }),
                                menuPortal: (base) => ({ ...base, zIndex: 99999999 }), // ✅ Ensures dropdown is above everything
                                option: (base, { isFocused, isSelected }) => ({
                                  ...base,
                                  backgroundColor: isSelected
                                      ? "rgba(255, 255, 255, 0.5)"
                                      : isFocused
                                          ? "rgba(255, 255, 255, 0.3)"
                                          : "transparent",
                                  color: "white",
                                }),
                                placeholder: (base) => ({
                                  ...base,
                                  color: "rgba(255, 255, 255, 0.7)",
                                }),
                                singleValue: (base) => ({ ...base, color: "white" }),
                              }}
                          />
                        </div>
                    )}
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

              {/* Food Allergies */}
              <div className={styles.formGroup}>
                <label htmlFor="food_allergies">
                  Dietary Preferences / Food Allergies
                </label>
                <input
                    id="food_allergies"
                    type="text"
                    placeholder="Enter dietary restrictions or food allergies"
                    {...register("food_allergies", {
                      required:
                          "Please enter your dietary preferences or food allergies",
                      minLength: {
                        value: 2,
                        message: "Please enter at least 2 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Too long. Please limit to 100 characters.",
                      },
                    })}
                />
                {errors.food_allergies && (
                    <span className={styles.error}>
                {errors.food_allergies.message}
              </span>
                )}
              </div>

              {/* Resume Upload */}
              <div className={styles.formGroup}>
                <label htmlFor="resume">Resume (PDF only)</label>
                <input
                    id="resume"
                    type="file"
                    accept=".pdf" // ✅ Only accept .pdf files
                    {...register("resume", {
                      required: "Resume upload is required",
                      validate: (files) => {
                        if (!files || files.length === 0)
                          return "Resume upload is required";
                        const file = files[0];
                        if (file.type !== "application/pdf")
                          return "Only PDF files are allowed";
                        return true;
                      },
                    })}
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
        ) : <span className={"text-2xl font-bold text-white animate-pulse"}>Form is loading...</span>}
      </div>
    </div>
  );
}
