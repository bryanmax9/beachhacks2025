'use client';
import { useState } from "react";

export default function SignUpForm(){
    // State variable and setter for form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    // TODO: Update this function to send form data to the DB
    // For now it just logs form data 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Submitted login form! Data:\n', formData);

        // Clear form data
        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: ''
        });
    }

    // Update state variables with newest input values
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    return (
        <>
        <form className="flex flex-col items-center w-1/4 bg-slate-500" onSubmit={handleSubmit}>
            {/* Name fields container to stack horizontally*/}
            <div className="bg-green-100 flex flex-row justify-center w-full">
                <label className="flex flex-col w-1/2">
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="flex flex-col w-1/2">
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            {/* Phone number, email, password container to stack vertically*/}
            <div className="bg-red-100 w-full flex flex-col">
                <label className="flex flex-col w-full">
                    Phone Number:
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="flex flex-col w-full">
                    Email:
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="flex flex-col w-full"> 
                    Password:
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
            <button className="bg-purple-100 w-full" type="submit">Sign Up</button>
            </div>
        </form>
        </>
    )

}