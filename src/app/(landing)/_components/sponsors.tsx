"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { dynaPuff } from "@/assets/fonts"
import { useEffect, useState } from "react"

const Sponsors = () => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const goldSponsorClass =
        "xxxs:w-[3vh] xxxs:h-[3vh] xxs:w-[4vh] xxs:h-[4vh] xs:w-[4vh] xs:h-[4vh] sm:w-[5vh] sm:h-[5vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white xxxs:border-[0.2rem] xxs:border-[0.3rem] xs:border-[0.4rem] sm:border-[0.4rem] md:border-[0.5rem] lg:border-[0.65rem]"

    const silverSponsorClass =
        "xxxs:w-[3vh] xxxs:h-[3vh] xxs:w-[4vh] xxs:h-[4vh] xs:w-[4vh] xs:h-[4vh] sm:w-[5vh] sm:h-[5vh] md:w-[7vh] md:h-[7vh] lg:w-[9vh] lg:h-[9vh] xl:w-[11vh] xl:h-[11vh] 2xl:w-[13vh] 2xl:h-[13vh] rounded-full overflow-hidden flex items-center justify-center bg-white xxxs:border-[0.2rem] xxs:border-[0.3rem] xs:border-[0.4rem] sm:border-[0.4rem] md:border-[0.5rem] lg:border-[0.65rem]"

    const submarineAnimation = {
        animate: {
            x: ["100%", "-100%"],
            y: [0, -10, 0],
        },
        transition: {
            x: {
                duration: 20,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
            },
            y: {
                duration: 5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
            },
        },
    }

    const silverSubmarineAnimation = {
        animate: {
            x: ["100%", "-100%"],
            y: [0, 10, 0],
        },
        transition: {
            x: {
                duration: 25,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
            },
            y: {
                duration: 6,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
            },
        },
    }

    const bubbleVariants = {
        initial: { y: 0, x: 0, opacity: 0, scale: 0 },
        animate: {
            x: (i) => 25 + i * 10,
            y: -100,
            opacity: [0, 1, 0],
            scale: [0, 1, 1.5],
        },
    }

    const SponsorLogo = ({ src, alt, borderColor }) => {
        return (
            <motion.div
                className={cn(goldSponsorClass, "group")}
                style={{ borderColor }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <motion.img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                />
            </motion.div>
        )
    }

    const BubbleTrail = () => {
        if (!isClient) return null

        return (
            <motion.div
                className="bubble-container absolute pointer-events-none"
                style={{
                    top: "51%",
                    right: "27%",
                    transform: "translateY(-50%)",
                    display: "flex",
                    gap: "0.5rem",
                }}
            >
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        variants={bubbleVariants}
                        custom={i}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: 3,
                            ease: "easeOut",
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: Math.random() * 2,
                            delay: i * 0.2,
                        }}
                        style={{
                            width: `${10 + Math.random() * 15}px`,
                            height: `${10 + Math.random() * 15}px`,
                            left: `${Math.random() * 50}px`,
                            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(173, 216, 230, 0.4))`,
                            boxShadow: `0 0 5px rgba(255, 255, 255, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.5)`,
                        }}
                    />
                ))}
            </motion.div>
        )
    }

    return (
        <section className="sponsors-section">
            <div
                className={cn(
                    "sponsors-header text-center xxxs:text-1.5xl xxs:text-2xl xs:text-2.5xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-4.5xl 2xl:text-5xl font-bold drop-shadow-md",
                    dynaPuff.className,
                )}
            >
                <div className="inline-block px-6 py-2 bg-white text-blue-900 rounded-full">
                    <h2>Our Sponsors</h2>
                </div>
            </div>

            <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
                <motion.div className="submarine-container relative flex items-center" {...submarineAnimation}>
                    <img src="/gold-submarine.svg" alt="Submarine" className="w-auto" />

                    <div className="sponsors flex justify-around items-center xxxs:w-[12vh] xxs:w-[15vh] xs:w-[22vh] sm:w-[23vh] md:w-[29vh] lg:w-[34vh] xl:w-[40vh] 2xl:w-[45vh] absolute top-[55.5%] left-[33.5%] transform -translate-y-1/2">
                        <SponsorLogo
                            src="https://loodibee.com/wp-content/uploads/Google-Logo.png"
                            alt="Sponsor-1-Google"
                            borderColor="#705A00"
                        />
                        <SponsorLogo src="/dainai.png" alt="Sponsor-2-DainAI" borderColor="#705A00" />
                    </div>

                    <BubbleTrail />
                </motion.div>
            </div>
            <div className="sponsors-list flex justify-center items-center text-2xl overflow-hidden relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
                <motion.div className="submarine-container relative flex items-center" {...silverSubmarineAnimation}>
                    <img src="/gold-submarine.svg" alt="Submarine" className="w-auto" />

                    <div className="sponsors flex justify-around items-center xxxs:w-[18vh] xxs:w-[22vh] xs:w-[30vh] sm:w-[35vh] md:w-[40vh] lg:w-[50vh] xl:w-[60vh] 2xl:w-[68vh] absolute top-[55.5%] left-[27%] transform -translate-y-1/2">
                        <SponsorLogo src="/code-and-coffee.svg" alt="Sponsor-3-code-and-coffee" borderColor="#777777" />
                    </div>
                    <BubbleTrail />
                </motion.div>
            </div>
        </section>
    )
}

export default Sponsors

