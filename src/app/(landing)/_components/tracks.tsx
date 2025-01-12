"use client"
import {tracks} from "@/app/_data/tracks";
import {useState} from "react";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    content: string | null;
    track: string;
}

function Modal ({ isOpen, closeModal, content, track }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-4">{track}</h2>
                <p>{content}</p>
                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ">
                    Close
                </button>
            </div>
        </div>
    );
}


export default function Tracks() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<{
        track: string | null;
        description: string | null;
    }>({
        track: null,
        description: null,
    });


    const handleModalClick = (content:{track:string, description: string}) => {
        setModalContent({
            track: content.track,
            description: content.description
        });
        setModalOpen(true);
    }
    return (
        <div className="flex-col p-6 mx-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Tracks</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tracks.map((c, index) => (
                    <div
                        key={index}
                        className="div h-[8em] w-[15em] bg-white m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div
                            className={`circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#ECAA00] group-hover:scale-[800%] duration-500 z-[-1]`}
                        ></div>
                        <button onClick={()=> handleModalClick({track: c.track, description:c.description})} className="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#000000] group-hover:text-white duration-500" >
                            <span
                                className="relative before:h-[0.16em] before:absolute before:w-full before:content-['']
                            before:bg-[#000000] group-hover:before:bg-white duration-300 before:bottom-0 before:left-0"
                            >
                                More Info
                            </span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em]">
                            {c.track}
                        </h1>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                closeModal={() => setModalOpen(false)}
                content={modalContent.description}
                track={modalContent.track ?? "No track selected"}
            />
        </div>
    );
}
