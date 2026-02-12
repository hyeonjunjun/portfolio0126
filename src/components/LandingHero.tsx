"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WoodcutIcon from "./WoodcutIcon";
import HighlighterSpan from "./HighlighterSpan";

export default function LandingHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">

            {/* Background Elements (Abstract Layout lines) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-12 w-[1px] h-full bg-[#1A1A18] opacity-5" />
                <div className="absolute top-0 right-12 w-[1px] h-full bg-[#1A1A18] opacity-5" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#1A1A18] opacity-5" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
            >
                {/* Left: The Manifesto */}
                <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D94E1E] mb-4 block">
                            Field Note 001: The Thesis
                        </span>

                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-[#1A1A18] mb-6">
                            Code is <br />
                            <span className="italic relative inline-block">
                                Craft
                                <svg className="absolute -bottom-2 left-0 w-full h-3 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0,5 Q50,10 100,5" stroke="#D94E1E" strokeWidth="2" fill="none" />
                                </svg>
                            </span>.
                        </h1>

                        <p className="font-serif text-xl md:text-2xl text-[#1A1A18]/80 max-w-2xl leading-relaxed">
                            Exploring the intersection of <HighlighterSpan delay={0.5}>Cognitive Science</HighlighterSpan>
                            and <HighlighterSpan delay={0.8} color="#ADD8E6">Artificial Intelligence</HighlighterSpan>.
                            We treat digital bits as a physical, tactile medium.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="flex items-center gap-4 mt-8"
                    >
                        <WoodcutIcon className="w-12 h-12 text-[#1A1A18]/60">
                            {/* Simple Brain/Network Icon */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
                                <path d="M12 2v10" />
                                <path d="M12 22v-7" />
                                <path d="M2.5 12h7" />
                                <path d="M14.5 12h7" />
                            </svg>
                        </WoodcutIcon>
                        <span className="font-hand text-sm rotate-[-2deg] opacity-60">
                            (Fig 1. The Neural Architecture)
                        </span>
                    </motion.div>
                </div>

                {/* Right: The "Woodcut" Illustration Hero */}
                <div className="hidden md:flex col-span-4 justify-center relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 3 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative w-full aspect-[3/4] border-4 border-[#1A1A18] bg-[#F2F0E9] p-4 shadow-xl"
                        style={{
                            boxShadow: "10px 10px 0px rgba(26, 26, 24, 0.1)"
                        }}
                    >
                        {/* Inner Illustration Placeholder - could be an actual image or complex SVG */}
                        <div className="w-full h-full border border-[#1A1A18]/20 flex items-center justify-center overflow-hidden relative">
                            {/* Abstract Woodcut Patterns */}
                            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                                <pattern id="woodcut" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M0,10 L10,0" stroke="#1A1A18" strokeWidth="0.5" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#woodcut)" />
                            </svg>

                            <div className="font-serif italic text-6xl opacity-10 rotate-90">
                                SAPIENS
                            </div>
                        </div>

                        {/* Tape Graphic */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#E8E1D0]/90 shadow-sm rotate-2" />
                    </motion.div>
                </div>

            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 text-[#1A1A18]">The Archive</span>
                <div className="w-[1px] h-12 bg-[#1A1A18]/20 overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 bg-[#1A1A18]"
                    />
                </div>
            </motion.div>
        </section>
    );
}
