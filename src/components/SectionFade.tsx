"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionFade({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Fade in when entering, Fade out when leaving
    // 0 -> 0.2 (Fade In) | 0.8 -> 1.0 (Fade Out)
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
