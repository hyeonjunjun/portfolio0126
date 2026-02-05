"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


export default function LandingHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0.4, 0.9], [1, 0]);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-transparent text-white">
            {/* 3D Background - Removed (now global) */}
            <motion.div style={{ y }} className="absolute inset-0 z-0" />

            {/* Content Contentier */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none"
            >
                {/* Header (Empty for now/Nav space) */}
                <div className="flex justify-between items-start">
                    <div />
                    <div className="text-right font-serif text-sm tracking-widest uppercase opacity-60 hidden md:block" />
                </div>

                {/* Footer Metadata + Name */}
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <div className="font-mono text-[10px] tracking-widest uppercase opacity-40">
                            [EST. 2026]
                        </div>
                        <h1 className="font-serif text-[5vw] leading-[0.9] tracking-tighter opacity-90 drop-shadow-2xl">
                            Hyeonjoon<br />Jun
                        </h1>
                    </div>

                    <div className="font-serif text-xl md:text-2xl max-w-md text-right leading-tight">
                        We curate digital noise for the<br />
                        <span className="italic opacity-60">next generation of discovery.</span>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 mix-blend-difference"
            >
                <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Scroll</span>
                <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 bg-white"
                    />
                </div>
            </motion.div>
        </section>
    );
}
