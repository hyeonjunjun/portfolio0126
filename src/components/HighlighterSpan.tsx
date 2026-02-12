"use client";

import { motion } from "framer-motion";

interface HighlighterSpanProps {
    children: React.ReactNode;
    color?: string; // e.g. "bg-yellow-200" or hex
    className?: string;
    delay?: number;
}

export default function HighlighterSpan({ children, color = "#ffeb3b", className = "", delay = 0 }: HighlighterSpanProps) {
    return (
        <span className={`relative inline-block px-1 mx-1 ${className}`}>
            {/* Highlight Layer */}
            <motion.span
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "circOut", delay }}
                className="absolute bottom-1 left-0 h-[40%] -z-10 opacity-70 rounded-sm mix-blend-multiply"
                style={{
                    backgroundColor: color,
                    transform: "rotate(-1deg)",
                }}
            />
            {/* Content */}
            <span className="relative z-0">{children}</span>
        </span>
    );
}
