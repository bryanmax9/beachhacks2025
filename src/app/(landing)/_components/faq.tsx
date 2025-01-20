"use client";

import { useState } from "react";
import { faqs } from "@/app/_data/faqs";

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
        <div className="min-h-screen w-full bg-gradient-to-b from-blue-300 to-blue-900 flex justify-center py-16 relative">
            {/* Floating Bubble with Crab */}
            <div className="absolute left-1/4 transform -translate-x-1/2 animate-float">
                <div className="w-32 h-32 bg-white/40 rounded-full flex items-center justify-center shadow-lg relative">
                    <img src="/crab.png" className="h-20 w-auto object-contain absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="Submarine"/>
                </div>
            </div>
            <div className="absolute left-3/4 transform -translate-x-1/2 animate-float">
                <div className="w-32 h-32 bg-white/40 rounded-full flex items-center justify-center shadow-lg relative">
                    <img src="/crab.png" className="h-20 w-auto object-contain absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="Submarine"/>
                </div>
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
