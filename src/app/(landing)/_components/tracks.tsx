"use client";
import React, { useState, useEffect } from "react";
import { tracks } from "@/app/_data/tracks";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import styles from "./track.module.css";

/**
 * Interface for each track.
 */
interface Track {
    track: string;
    description: string;
}

/**
 * ModalProps interface.
 */
interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    content: string | null;
    track: string | null;
}

/**
 * LayoutMode enum.
 */
enum LayoutMode {
    STACKED = "stacked",
    REGULAR = "regular",
}

/**
 * Modal Component
 */
function Modal({ isOpen, closeModal, content, track }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
        >
            {/* Dark Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={closeModal}
            />
            {/* Modal Content with Water Background */}
            <div
                className={`relative bg-white p-6 rounded-xl shadow-lg max-w-md w-full z-60 ${styles["modal-water-container"]}`}
            >
                {/* Water Background Animation */}
                <div className={styles["modal-water-background"]} />

                {/* Modal Content */}
                <div className={styles["modal-content"]}>
                    <h2 className="text-2xl font-bold mb-4 text-center">{track}</h2>
                    <p className="text-gray-700 mb-6 text-center">{content}</p>
                    <button
                        onClick={closeModal}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}


/**
 * Fish Component representing a Jellyfish with a Track Sign.
 */
interface FishPosition {
    top: string;
}

interface FishProps {
    track: Track;
    onClick: () => void;
}

function Fish({ top }: FishPosition) {
    const [size, setSize] = useState(200);
    useEffect(() => {
        const newSize = Math.round(Math.min(200, Math.random() * 300));
        setSize(newSize);
    }, []);
    return (
        <div
            className={`absolute ${top} ${styles["animate-moveAcross"]}`}
            style={{ height: `${size}px`, width: `${size}px` }}
        >
            <img src="/fish.png" alt="Fish" style={{ height: "100%", width: "100%" }} />
        </div>
    );
}

function JellyFish({ track, onClick }: FishProps) {
    return (
        <div
            onClick={onClick}
            className="relative flex flex-col items-center cursor-pointer rounded-lg py-4"
        >
            <TooltipProvider>
                <Tooltip>
                    {/* TooltipTrigger wraps the image */}
                    <TooltipTrigger asChild>
                        <img
                            src="/jellyfish.png" // Ensure this path is correct
                            alt={`${track.track} Jellyfish`}
                            className="w-24 h-24 object-contain mb-2"
                        />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className={`text-2xl text-center text-gray-800`}>
                                {track.track}
                            </h1>
                            <p className="text-gray-800">{track.description}</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <span className="text-black font-semibold bg-white bg-opacity-80 p-2 rounded-md shadow-md border-2 border-black absolute top-[90%] left-1/2 transform -translate-x-1/2">
                {track.track}
            </span>
        </div>
    );
}

/**
 * TracksPage Component
 */
export default function TracksPage() {
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTrack, setModalTrack] = useState<string | null>(null);
    const [modalDescription, setModalDescription] = useState<string | null>(null);
    const [layoutMode, setLayoutMode] = useState<LayoutMode>(LayoutMode.REGULAR);

    useEffect(() => {
        function handleResize() {
            const w = window.innerWidth;
            if (w < 600) {
                setLayoutMode(LayoutMode.STACKED);
            } else {
                setLayoutMode(LayoutMode.REGULAR);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Open the modal
    const openModal = (trackName: string, description: string) => {
        setModalTrack(trackName);
        setModalDescription(description);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalTrack(null);
        setModalDescription(null);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-blue-300 to-blue-900 flex items-center justify-center p-8">
            {/* Grid container for the jellyfish/tracks */}
            <Fish top={`top-10`} />
            {layoutMode === LayoutMode.REGULAR ? (
                <div className="grid grid-cols-3 gap-24 w-3/4">
                    {tracks.map((trackItem: Track, index: number) => (
                        <div key={index} className={index % 2 === 0 ? "float-slow" : "floatSlow2"}>
                            <JellyFish
                                track={trackItem}
                                onClick={() => openModal(trackItem.track, trackItem.description)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-24 w-3/4">
                    {tracks.map((trackItem: Track, index: number) => (
                        <div key={index}>
                            <JellyFish
                                track={trackItem}
                                onClick={() => openModal(trackItem.track, trackItem.description)}
                            />
                        </div>
                    ))}
                </div>
            )}
            {/* Modal for track details */}
            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                content={modalDescription}
                track={modalTrack}
            />
        </div>
    );
}