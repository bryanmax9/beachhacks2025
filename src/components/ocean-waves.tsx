
"use client";

import React, { useEffect, useState } from 'react';

interface BubbleProps {
    size: number;
    left: number;
    animationDuration: number;
}

interface Bubble extends BubbleProps {
    id: number;
}

const Bubble: React.FC<BubbleProps> = ({ size, left, animationDuration }) => (
    <div
        className="absolute rounded-full animate-float backdrop-blur-[1px]"
        style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: '0',
            animationDuration: `${animationDuration}s`,
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.05) 100%)',
            boxShadow: `
                inset -3px -3px 6px rgba(0, 0, 0, 0.05),
                inset 3px 3px 6px rgba(255, 255, 255, 0.2),
                0 0 5px rgba(255, 255, 255, 0.1)
            `,
            border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
    >
        <div
            className="absolute rounded-full"
            style={{
                width: '30%',
                height: '30%',
                left: '20%',
                top: '20%',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 100%)'
            }}
        />
    </div>
);

interface OceanWavesProps {
    children: React.ReactNode;
}

const OceanWaves: React.FC<OceanWavesProps> = ({ children }) => {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);

    useEffect(() => {
        const createBubble = (): void => {
            const bubble: Bubble = {
                id: Math.random(),
                size: Math.random() * 15 + 8,
                left: Math.random() * 100,
                animationDuration: Math.random() * 10 + 15,
            };

            setBubbles(prev => [...prev, bubble]);

            setTimeout(() => {
                setBubbles(prev => prev.filter(b => b.id !== bubble.id));
            }, bubble.animationDuration * 1000);
        };

        const intervalId = setInterval(createBubble, 800);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Top section with wave */}
            <div className="h-[320px] bg-[#54b4c4] w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute left-0 w-full">
                    <defs>
                        <linearGradient id="waterGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#ecbc7c" stopOpacity="1" />
                            <stop offset="100%" stopColor="#d4a76a" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path
                        className="opacity-50"
                        d="M0,288L30,245.3C60,203,120,117,180,96C240,75,300,117,360,128C420,139,480,117,540,106.7C600,96,660,96,720,112C780,128,840,160,900,154.7C960,149,1020,107,1080,101.3C1140,96,1200,128,1260,170.7C1320,213,1380,267,1410,293.3L1440,320L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="18"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    <path
                        fill="url(#waterGradient)"
                        d="M0,288L30,245.3C60,203,120,117,180,96C240,75,300,117,360,128C420,139,480,117,540,106.7C600,96,660,96,720,112C780,128,840,160,900,154.7C960,149,1020,107,1080,101.3C1140,96,1200,128,1260,170.7C1320,213,1380,267,1410,293.3L1440,320L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
                    />
                </svg>
            </div>

            {/* Underwater section with content */}
            <div className="relative min-h-screen bg-[#54b4c4] w-full">
                {/* Water gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2a5964] pointer-events-none" />

                {/* Content container - centered and full width */}
                <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="w-full flex flex-col items-center justify-center">
                        {children}
                    </div>
                </div>

                {/* Bubbles */}
                {bubbles.map(bubble => (
                    <Bubble
                        key={bubble.id}
                        size={bubble.size}
                        left={bubble.left}
                        animationDuration={bubble.animationDuration}
                    />
                ))}
            </div>

            <style jsx global>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3;
                        transform: translateY(-10vh) translateX(-5px) scale(1.1);
                    }
                    50% {
                        opacity: 0.4;
                        transform: translateY(-50vh) translateX(10px) scale(1);
                    }
                    90% {
                        opacity: 0.3;
                        transform: translateY(-90vh) translateX(-5px) scale(0.9);
                    }
                    100% {
                        transform: translateY(-100vh) translateX(0) scale(0.8);
                        opacity: 0;
                    }
                }

                .animate-float {
                    animation: float var(--duration, 15s) ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default OceanWaves;