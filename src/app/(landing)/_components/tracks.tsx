"use client";

import React, { useEffect, useRef, useState } from "react";
import { tracks } from "@/app/_data/tracks";

/**
 * A simple enum to indicate the layout mode.
 * BUBBLE => below 1000px
 * STACKED => 1000px to 1200px
 * SIDE => above 1200px
 */
enum LayoutMode {
    BUBBLE = "bubble",
    STACKED = "stacked",
    SIDE = "side",
}

/** Abbreviations for certain tracks */
const track_abrv: Record<string, string> = {
    Education: "EDU",
    AI: "AI",
    FinTech: "FIN",
    Healthcare: "HEA",
    Sustainability: "SUS"
};

// The shape of each Track
interface Track {
    track: string;
    description: string;
    top: string;
    left: string;
    width: string;
    height: string;
}

/** Props for the Modal */
interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    content: string | null;
    track: string | null;
}

/** A simple modal */
function Modal({ isOpen, closeModal, content, track }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Dark overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={closeModal}
            />
            {/* Modal Box */}
            <div
                className="relative bg-white p-6 rounded-2xl shadow-xl max-w-md w-full
                   transform transition-all duration-300 ease-in-out
                   flex flex-col items-center justify-center"
                style={{
                    opacity: isOpen ? 1 : 0,
                    scale: isOpen ? 1 : 0.95,
                }}
            >
                <h2 className="text-2xl font-bold mb-4 text-black text-center">
                    {track}
                </h2>
                <p className="text-black leading-relaxed text-center">{content}</p>
                <button
                    onClick={closeModal}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full
                     hover:bg-blue-700 transition-colors duration-200 w-full text-center"
                >
                    Close Window
                </button>
            </div>
        </div>
    );
}

/**
 * A bubble for the "mobile" layout.
 * Clicking it opens the same modal as the submarine markers do.
 */
function Bubble({
                    track,
                    onClick,
                }: {
    track: Track;
    onClick: (track: Track) => void;
}) {
    return (
        <div
            onClick={() => onClick(track)}
            className="w-24 h-24 rounded-full flex items-center justify-center
                 border-2 border-gray-300 cursor-pointer m-2 bubble"
        >
      <span className="text-black font-bold p-2 text-center break-words">
        {track_abrv[track.track] || track.track}
      </span>
        </div>
    );
}

/**
 * Submarine: displays the submarine image and markers.
 * The actual "zoom" is controlled at the SCENE level, not here.
 */
function Submarine({
                       tracks,
                       submarineIndex,
                       onMarkerClick,
                   }: {
    tracks: Track[];
    submarineIndex: number;
    onMarkerClick: (track: Track, markerIndex: number, subIndex: number) => void;
}) {
    return (
        <div className="relative inline-block pointer-events-none">
            {/* Submarine image */}
            <img
                src="/submarine.png"
                alt={`Submarine ${submarineIndex + 1}`}
                className="w-full h-auto pointer-events-none"
            />
            {/* Markers */}
            {tracks.map((track, i) => (
                <div
                    key={i}
                    className="absolute cursor-pointer pointer-events-auto"
                    style={{
                        top: track.top,
                        left: track.left,
                        width: track.width,
                        height: track.height,
                    }}
                    onClick={() => onMarkerClick(track, i, submarineIndex)}
                >
                    <div
                        className="w-full h-full border-2 border-gray-300 bg-white/80
                       flex items-center justify-center rounded-full"
                    >
            <span className="text-black font-bold px-2 py-1 text-center break-words">
              {track_abrv[track.track] || track.track}
            </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

/**
 * Main page: adjusts layout based on screen width:
 * - <1000px => bubble layout (no zoom)
 * - 1000px-1200px => stacked submarines (zoom)
 * - >1200px => side-by-side submarines (zoom)
 */
export default function TracksPage() {
    // Decide layout based on width
    const [layoutMode, setLayoutMode] = useState<LayoutMode>(LayoutMode.SIDE);

    useEffect(() => {
        function handleResize() {
            const w = window.innerWidth;
            if (w < 1000) {
                setLayoutMode(LayoutMode.BUBBLE);
            } else if (w < 1200) {
                setLayoutMode(LayoutMode.STACKED);
            } else {
                setLayoutMode(LayoutMode.SIDE);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTrack, setModalTrack] = useState<string | null>(null);
    const [modalDescription, setModalDescription] = useState<string | null>(null);

    const sceneRef = useRef<HTMLDivElement>(null);
    const [sceneScale, setSceneScale] = useState(1);
    const [sceneOrigin, setSceneOrigin] = useState("50% 50%");

    const [sceneWidth, setSceneWidth] = useState(0);
    const [sceneHeight, setSceneHeight] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (sceneRef.current) {
                const rect = sceneRef.current.getBoundingClientRect();
                setSceneWidth(rect.width);
                setSceneHeight(rect.height);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [layoutMode]);

    // Opens the modal
    const openModal = (trackName: string, desc: string) => {
        setModalTrack(trackName);
        setModalDescription(desc);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSceneScale(1);
    };

    // Utility: parse "30%" => numeric px within containerWidth
    function parseOffset(value: string, containerSize: number) {
        if (value.endsWith("%")) {
            const pct = parseFloat(value) / 100;
            return pct * containerSize;
        } else if (value.endsWith("px")) {
            return parseFloat(value);
        }
        return 0;
    }

    // Marker or bubble click logic
    const handleMarkerClick = (
        track: { track: string; description: string; top: string; left: string },
        markerIndex: number,
        subIndex: number
    ) => {
        // If we are in bubble layout, just open the modal (no zoom).
        if (layoutMode === LayoutMode.BUBBLE) {
            openModal(track.track, track.description);
            return;
        }

        const subId = `sub-${subIndex}`;
        const subEl = document.getElementById(subId);
        if (!subEl) {
            // fallback: just open modal
            openModal(track.track, track.description);
            return;
        }
        const subRect = subEl.getBoundingClientRect();

        // Convert track's top/left to px within sub's container
        const markerLocalX = parseOffset(track.left, subRect.width);
        const markerLocalY = parseOffset(track.top, subRect.height);

        // Marker absolute position on the screen
        const markerSceneX = subRect.x + markerLocalX;
        const markerSceneY = subRect.y + markerLocalY;

        // Convert to scene-wide percentages
        if (sceneWidth > 0 && sceneHeight > 0 && sceneRef.current) {
            // Get the bounding rect of the scene container
            const sceneRect = sceneRef.current.getBoundingClientRect();

            // Calculate percentages relative to the scene container using bounding rect positions
            const percentX = ((markerSceneX - sceneRect.left) / sceneRect.width) * 100;
            const percentY = ((markerSceneY - sceneRect.top) / sceneRect.height) * 100;

            setSceneOrigin(`${percentX}% ${percentY}%`);
            setSceneScale(5); // or your desired scale
        }

        // Open modal after short delay
        setTimeout(() => {
            openModal(track.track, track.description);
        }, 600);
    };

    return (
        <div className="relative w-full h-screen bg-gradient-to-b from-blue-300 to-blue-900 overflow-hidden">
            {layoutMode === LayoutMode.BUBBLE ? (
                // BUBBLE layout
                <div className="flex flex-col items-center justify-center h-full p-4">
                    <div className="absolute top-0 left-1/4 transform -translate-x-1/2 animate-moveAcross" style={{ pointerEvents: 'none' }}>
                        <img src="/submarine.png" />
                    </div>
                    <h2 className="text-white text-xl mb-4">Tracks</h2>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {tracks.map((t) => (
                            <Bubble
                                key={t.track}
                                track={t}
                                onClick={(track) => openModal(track.track, track.description)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    ref={sceneRef}
                    className="relative w-full h-full"
                    style={{
                        transformOrigin: sceneOrigin,
                        transform: `scale(${sceneScale})`,
                        transition: "transform 0.6s ease-in-out",
                    }}
                >
                    {layoutMode === LayoutMode.STACKED ? (
                        // 1000px <= w < 1200px => stacked submarines
                        <div className="float-slow relative w-full h-full">
                            <div
                                id="sub-0"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 200,
                                    width: "60vw",
                                }}
                            >
                                <Submarine
                                    tracks={tracks.slice(0, 3)}
                                    submarineIndex={0}
                                    onMarkerClick={handleMarkerClick}
                                />
                            </div>
                            <div
                                id="sub-1"
                                style={{
                                    position: "absolute",
                                    top: 400,
                                    left: 200,
                                    width: "60vw",
                                }}
                            >
                                <Submarine
                                    tracks={tracks.slice(3, 5)}
                                    submarineIndex={1}
                                    onMarkerClick={handleMarkerClick}
                                />
                            </div>
                        </div>
                    ) : (
                        // layoutMode === LayoutMode.SIDE => side-by-side
                        <div className="float-slow relative w-full h-full">
                            <div
                                id="sub-0"
                                style={{ position: "absolute", top: 0, left: 200, width: "49vw" }}
                            >
                                <Submarine
                                    tracks={tracks.slice(0, 3)}
                                    submarineIndex={0}
                                    onMarkerClick={handleMarkerClick}
                                />
                            </div>
                            <div
                                id="sub-1"
                                style={{ position: "absolute", top: 200, left: 700, width: "50vw" }}
                            >
                                <Submarine
                                    tracks={tracks.slice(3, 5)}
                                    submarineIndex={1}
                                    onMarkerClick={handleMarkerClick}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Shared modal */}
            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                content={modalDescription}
                track={modalTrack}
            />
        </div>
    );
}
