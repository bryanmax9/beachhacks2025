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

const OceanWavesNoSand: React.FC<OceanWavesProps> = ({ children }) => {
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
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#54b4c4] to-[#2a5964]">
            {/* Underwater section with content */}
            <div className="relative min-h-screen w-full">
                {/* Water gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2a5964] pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 w-full flex flex-col items-center justify-center">
                    {children}
                </div>

                {/* Floating Bubbles */}
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

export default OceanWavesNoSand;
