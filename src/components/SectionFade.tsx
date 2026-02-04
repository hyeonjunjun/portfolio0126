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
    // Extended duration and softer parameters for a "drifting" feel
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.98, 1, 1, 0.98]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [20, 0, 0, -20]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, y }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
