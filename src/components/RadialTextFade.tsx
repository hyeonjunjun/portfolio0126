"use client";

import { motion } from "framer-motion";

interface RadialTextFadeProps {
    text: string;
    className?: string;
}

export default function RadialTextFade({ text, className = "" }: RadialTextFadeProps) {
    const chars = text.split("");
    const centerIndex = Math.floor(chars.length / 2);

    return (
        <h2 className={className}>
            {chars.map((char, i) => {
                const distance = Math.abs(i - centerIndex);

                return (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: distance * 0.05,
                            ease: "easeOut"
                        }}
                        className="inline-block"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                );
            })}
        </h2>
    );
}
