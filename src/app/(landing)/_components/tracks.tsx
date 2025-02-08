"use client";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { dynaPuff } from "@/assets/fonts";
import styles from "../_components/track.module.css";
// Enhanced track data with more hackathon-specific information
const tracks = [
  {
    track: "Education",
    description:
      "Transform the future of learning through technology. Focus areas include EdTech platforms, accessibility tools, and personalized learning solutions.",
    requirements: [
      "Must include AI/ML component",
      "Focus on accessibility",
      "Open-source preferred",
    ],
  },
  {
    track: "AI",
    description:
      "Push the boundaries of artificial intelligence and machine learning. Build solutions in NLP, computer vision, or generative AI.",
    requirements: [
      "Original AI/ML implementation",
      "Real-world application",
      "Performance metrics",
    ],
  },
  {
    track: "FinTech",
    description:
      "Revolutionize financial services through innovative technology. Areas include DeFi, payments, banking, and financial inclusion.",
    requirements: [
      "Security-first approach",
      "Scalable architecture",
      "Regulatory compliance",
    ],
  },
  {
    track: "Healthcare",
    description:
      "Create solutions that improve patient care and medical systems. Focus on telemedicine, patient monitoring, or health data analytics.",
    requirements: [
      "HIPAA Compliance",
      "Medical Expert Validation",
      "Impact Metrics",
    ],
  },
  {
    track: "Sustainability",
    description:
      "Build technology to combat climate change and promote environmental sustainability. Focus on clean energy, waste reduction, or carbon tracking.",
    requirements: ["Measurable Impact", "Scalable Solution", "Open Data Usage"],
  },
  {
    track: "Web3",
    description:
      "Develop decentralized applications and blockchain solutions. Areas include DeFi, NFTs, DAOs, or web3 infrastructure.",
    requirements: [
      "Smart Contract Security",
      "Web3 Integration",
      "Token Economics",
    ],
  },
];

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  track: any;
}

function Modal({ isOpen, closeModal, track }: ModalProps) {
  if (!isOpen || !track) return null;

  return (
    <div
      id="track"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        dynaPuff.className
      )}
    >
      {/* Blurred Overlay (lowest z-index) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
        onClick={closeModal}
      />

      {/* Jellyfish Image (middle z-index) */}
      <img
        src="/jellyfish.png"
        alt="jellyfish"
        className={`absolute top-[240px] transform -translate-y-1/2 md:w-56 lg:w-64 z-20`}
      />

      <div className="relative bg-white bg-opacity-100 p-8 rounded-xl shadow-xl max-w-2xl w-full mx-4 z-30 overflow-visible">
        <h2 className="text-3xl font-bold mb-4 text-blue-900 text-center">
          {track.track}
        </h2>
        <p className="text-lg mb-6 text-gray-700">{track.description}</p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-800">
            Requirements
          </h3>
          <ul className="list-disc pl-5 text-gray-700">
            {track.requirements.map((req: string, index: number) => (
              <li key={index} className="mb-1">
                {req}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={closeModal}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function JellyFish({ track, onClick }: { track: any; onClick: () => void }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset({
        x: Math.sin(Date.now() / 2000) * 20,
        y: Math.cos(Date.now() / 2000) * 20,
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 2s ease-out",
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative w-40 h-40">
              <img
                src="/jellyfish.png"
                alt={track.track}
                className="w-full h-full object-contain transition-opacity group-hover:opacity-80"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-md p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl"
          >
            <p className="text-sm text-gray-700">{track.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="mt-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-2 border-blue-200 text-blue-900 font-bold text-lg transition-colors group-hover:bg-blue-50">
        {track.track}
      </span>
    </div>
  );
}

export default function TracksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    const handleResize = () => {
      setLayout(window.innerWidth < 768 ? "stack" : "grid");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (track: any) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full py-12">
      <div
        className={`container mx-auto px-4 ${
          layout === "grid"
            ? "grid grid-cols-2 lg:grid-cols-3 gap-16"
            : "flex flex-col gap-16"
        }`}
      >
        {tracks.map((track, index) => (
          <div key={index} className="flex justify-center">
            <JellyFish track={track} onClick={() => openModal(track)} />
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        track={selectedTrack}
      />
    </div>
  );
}
