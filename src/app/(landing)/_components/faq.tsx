"use client";
import {cn} from "@/lib/utils";
import { useState } from "react";
import { faqs } from "../../_data/faqs";
import styles from "../_components/faq.module.css"
import {dynaPuff} from "@/assets/fonts";
export default function FAQ() {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleFAQ = (index: number) => {
        setOpenIndexes((prevOpenIndexes) =>
            prevOpenIndexes.includes(index)
                ? prevOpenIndexes.filter((i) => i !== index)
                : [...prevOpenIndexes, index]
        );
    };

    return (
        <div className={cn(`min-h-screen w-full flex justify-center py-16 relative`, dynaPuff.className)}>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/3 -translate-x-1/4 -z-20 rotate-45">
                <img
                    src="/coral1.png"
                    className={`h-48 w-auto object-contain ${styles.animateCoralSwayLeft}`}
                    alt="coral"
                />
            </div>
            <div className="absolute right-10 top-1/3 transform translate-x-1/2 -rotate-45 -z-20">
                <img
                    src="/coral1.png"
                    className={`h-60 w-auto object-contain ${styles.animateCoralSwayRight}`}
                    alt="coral"
                />
            </div>

            <div className="absolute right-10 top-2/3 transform translate-x-1/2 -rotate-45 -z-20">
                <img
                    src="/coral1.png"
                    className={`h-60 w-auto object-contain ${styles.animateCoralSwayRight}`}
                    alt="coral"
                />
            </div>
            {/* Content Container */}
            <div className="space-y-4 w-full sm:max-w-screen-lg mx-auto p-4 mt-24">
                {/* Title */}
                <div className="flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ Items */}
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md transition-all duration-300 border border-gray-200"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left flex justify-between items-center p-4 focus:outline-none"
                        >
                            <span className="text-lg font-semibold text-gray-800">
                                {faq.question}
                            </span>
                            <span
                                className={`text-gray-500 transition-transform duration-300 ${
                                    openIndexes.includes(index) ? "rotate-180" : ""
                                }`}
                            >
                                ▼
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                openIndexes.includes(index) ? "max-h-[300px]" : "max-h-0"
                            }`}
                        >
                            <p className="text-gray-600 p-4">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
