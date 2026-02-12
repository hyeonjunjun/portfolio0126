"use client";

import { motion } from "framer-motion";

interface WoodcutIconProps {
    children: React.ReactNode;
    className?: string;
}

export default function WoodcutIcon({ children, className = "" }: WoodcutIconProps) {
    return (
        <div className={`relative inline-block group cursor-pointer ${className}`}>
            {/* Jitter Filter Wrapper */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                animate={{
                    rotate: [0, 1, -1, 0],
                    x: [0, 1, -1, 0],
                    y: [0, -1, 1, 0]
                }}
                transition={{
                    duration: 0.2, // Fast jitter
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    times: [0, 0.25, 0.75, 1]
                }}
                // Only animate on hover (or always if desired, but boiling is usually hover)
                className="group-hover:animate-scrawl"
                style={{ originX: 0.5, originY: 0.5 }}
            >
                {children}
            </motion.div>

            <style jsx global>{`
            @keyframes scrawl {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(1px, 1px) rotate(1deg); }
                50% { transform: translate(-1px, -1px) rotate(-1deg); }
                75% { transform: translate(-1px, 1px) rotate(0deg); }
                100% { transform: translate(1px, -1px) rotate(1deg); }
            }
            .group-hover\:animate-scrawl {
                animation: scrawl 0.3s steps(2) infinite;
            }
        `}</style>
        </div>
    );
}
