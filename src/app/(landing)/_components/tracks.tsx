export default function Tracks() {
    return (
        <div className="flex-col p-6 mx-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Tracks</h1>
            <div className="grid grid-cols-3 gap-4">
                {["Education", "AI", "FinTech", "Healthcare", "Sustainability"].map((title, index) => (
                    <div
                        key={index}
                        className="div h-[8em] w-[15em] bg-white m-auto rounded-[1em] overflow-hidden relative group p-2 z-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <div
                            className={`circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-[#ECAA00] group-hover:scale-[800%] duration-500 z-[-1]`}
                        ></div>
                        <button className="text-[0.8em] absolute bottom-[1em] left-[1em] text-[#6C3082] group-hover:text-white duration-500">
                            <span
                                className="relative before:h-[0.16em] before:absolute before:w-full before:content-['']
                            before:bg-[#6C3082] group-hover:before:bg-white duration-300 before:bottom-0 before:left-0"
                            >
                                More Info
                            </span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                        <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em]">
                            {title}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
