"use client";

import { motion } from "framer-motion";

interface InkButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "secondary";
}

export default function InkButton({ children, onClick, className = "", variant = "primary" }: InkButtonProps) {
    const isPrimary = variant === "primary";

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                relative px-8 py-3 
                font-serif font-bold text-lg tracking-wide
                ${isPrimary ? "text-[#F2F0E9]" : "text-[#1A1A18]"}
                ${className}
            `}
        >
            {/* SVG Background Blob */}
            <svg
                className="absolute inset-0 w-full h-full -z-10 overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M0,0 L100,0 L100,100 L0,100 Z"
                    fill={isPrimary ? "var(--color-ink)" : "transparent"}
                    stroke={isPrimary ? "none" : "var(--color-ink)"}
                    strokeWidth="2"
                    initial={{ d: "M2,5 Q50,-2 98,5 L95,95 Q50,102 5,95 Z" }}
                    animate={{
                        d: [
                            "M2,5 Q50,-2 98,5 L95,95 Q50,102 5,95 Z",
                            "M5,2 Q50,8 95,2 L98,98 Q50,90 2,98 Z",
                            "M2,5 Q50,-2 98,5 L95,95 Q50,102 5,95 Z"
                        ]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </svg>

            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </motion.button>
    );
}
