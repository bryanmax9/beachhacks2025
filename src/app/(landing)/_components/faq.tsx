"use client";
import { useState } from "react";

type FAQItem = {
    question: string;
    answer: string;
};

export default function FAQ({ faqs }: { faqs: FAQItem[] }) {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleFAQ = (index: number) => {
        setOpenIndexes((prevOpenIndexes) =>
            prevOpenIndexes.includes(index)
                ? prevOpenIndexes.filter((i) => i !== index)
                : [...prevOpenIndexes, index]
        );
    };

    return (
        <div className="space-y-4 max-w-screen-lg mx-auto mt-6">
            <div>
                <h2 className="text-2xl font-semibold">FAQs</h2>
            </div>
            {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left flex justify-between items-center py-2"
                    >
                        <span className="text-lg font-semibold">{faq.question}</span>
                        <span
                            className={`transition-transform duration-300 ${
                                openIndexes.includes(index) ? "rotate-180" : ""
                            }`}
                        >
                            ▼
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${
                            openIndexes.includes(index) ? "max-h-[200px]" : "max-h-0"
                        }`}
                    >
                        <p className="mt-2 text-gray-600">{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}