"use client";
import { useForm } from "react-hook-form"
import { sendForm } from "../_services/sendForm";

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
export default function ApplicationForm () {
    const {register, handleSubmit, reset} = useForm<ApplicationFormTypes>();
    const onSubmit = (data: ApplicationFormTypes) => {
        sendForm(data);
    }
    return (
        <>
        <form className="w-1/2">
            <label htmlFor="school" className="block text-sm font-semibold text-blue-900">
               School 
            </label>
            <input
                id="school"
                type="text"
                {...register("school")}
                placeholder="CSULB"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            <label htmlFor="emergency_contact" className="block text-sm font-semibold text-blue-900">
                Emergency Contact 
            </label>
            <input
                id="emergency_contact"
                type="text"
                {...register("emergency_contact")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            <label htmlFor="why_interested" className="block text-sm font-semibold text-blue-900">
                Why are you interested? 
            </label>
            <input
                id="why_interested"
                type="text"
                {...register("why_interested")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            <label htmlFor="experience" className="block text-sm font-semibold text-blue-900">
                Experience
            </label>
            <input
                id="experience"
                type="number"
                {...register("experience")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            <label htmlFor="have_team" className="block text-sm font-semibold text-blue-900">
                Do you have a team?
            </label>
            <div className="flex items-center align-middle justify-center bg-red-50">
            <input
                id="have_team"
                type="radio"
                {...register("have_team")}
                value="yes"
                className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span>yes</span>
            </div>
            <div className="flex items-center align-middle justify-center bg-red-50">
            <input
                id="have_team"
                type="radio"
                {...register("have_team")}
                value="no"
                className="mt-1 block border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span>no</span>
            </div>

            <label htmlFor="age" className="block text-sm font-semibold text-blue-900">
                Age
            </label>
            <input
                id="age"
                type="number"
                {...register("age")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            <label htmlFor="graduation_year" className="block text-sm font-semibold text-blue-900">
                Graduation Year
            </label>
            <input
                id="graduation_year"
                type="number"
                {...register("graduation_year")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            <label htmlFor="resume" className="block text-sm font-semibold text-blue-900">
                Resume
            </label>
            <input
                id="resume"
                type="file"
                {...register("resume")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />

            <button onClick={handleSubmit(onSubmit)}>Submit</button>
        </form>
        </>
    )
}