"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * PhilosophyStrip
 * ───────────────
 * Horizontal marquee ticker with hover-pause and subtle scale lift.
 * Rests at a gentle scale(0.98), springs to 1.0 on hover
 * for an organic, non-mechanical feel without any 3D distortion.
 */

const PHRASES = [
    "Digital Naturalism",
    "Design Engineering",
    "Interfaces as Habitats",
    "NYC · Worldwide",
    "Est. 2026",
    "나비 = Butterfly",
    "Nothing is Unnecessary",
];

function MarqueeContent() {
    return (
        <>
            {PHRASES.map((phrase, i) => (
                <span key={i} className="flex items-center gap-8 shrink-0">
                    <span className="font-pixel text-[clamp(1rem,2vw,1.4rem)] text-ink-muted whitespace-nowrap">
                        {phrase}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-faint/30 shrink-0" />
                </span>
            ))}
        </>
    );
}

export default function PhilosophyStrip() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section
            ref={ref}
            className="relative py-10 sm:py-14 border-y border-ink/[0.06] overflow-hidden select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                className="flex"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={inView ? { opacity: 1, scale: isPaused ? 1 : 0.98 } : {}}
                transition={{
                    opacity: { duration: 1 },
                    scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{ transformOrigin: "center center" }}
            >
                {/* Two copies for seamless loop */}
                <div className={`flex items-center gap-8 animate-marquee ${isPaused ? "animate-marquee-paused" : ""}`}>
                    <MarqueeContent />
                </div>
                <div className={`flex items-center gap-8 animate-marquee ${isPaused ? "animate-marquee-paused" : ""}`} aria-hidden>
                    <MarqueeContent />
                </div>
            </motion.div>
        </section>
    );
}
