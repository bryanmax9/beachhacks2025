"use client";

import {useState} from "react";
import {faqs} from "@/app/_data/faqs";


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
        <div className="space-y-4 w-full sm:max-w-screen-lg mx-auto mt-8 p-4">
            <div>
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Frequently Asked Questions
                </h2>
            </div>
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
    );
}
