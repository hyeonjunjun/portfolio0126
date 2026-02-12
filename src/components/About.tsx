"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import HighlighterSpan from "./HighlighterSpan";

export default function About() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    return (
        <section ref={container} id="about" className="min-h-screen py-24 px-6 md:px-12 bg-[#F2F0E9] relative overflow-hidden flex items-center">

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10 block">

                {/* Left: The Scrapbook Photo */}
                <motion.div
                    style={{ y, rotate }}
                    className="relative w-full aspect-[4/5] bg-white p-4 shadow-2xl rotate-[-2deg]"
                >
                    {/* Tape Strips */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#E8E1D0]/90 shadow-sm rotate-2 z-20" />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#E8E1D0]/90 shadow-sm -rotate-1 z-20" />

                    {/* Image Placeholder */}
                    <div className="relative w-full h-full bg-[#E5E5E5] overflow-hidden grayscale contrast-125">
                        {/* Replace with actual portrait */}
                        <div className="absolute inset-0 flex items-center justify-center text-[#1A1A18]/20 font-mono text-xs uppercase tracking-widest">
                            [Portrait.jpg]
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)] mix-blend-multiply" />
                    </div>

                    {/* Handwritten Note */}
                    <div className="absolute -right-8 bottom-12 font-hand text-[#1A1A18] text-sm rotate-[-4deg] max-w-[150px] leading-tight hidden md:block">
                        <span className="text-[#D94E1E] text-2xl block relative -left-2">*</span>
                        Always searching for the signal.
                    </div>
                </motion.div>

                {/* Right: The Field Notes */}
                <div className="flex flex-col gap-8">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D94E1E]">
                        Field Note 003: The Human Element
                    </span>

                    <h2 className="font-serif text-5xl md:text-6xl text-[#1A1A18] leading-[0.9]">
                        Software with the<br />
                        <span className="italic relative inline-block text-[#1A1A18]">
                            soul
                            <svg className="absolute top-1/2 left-0 w-full h-full stroke-[#D94E1E] stroke-[2px] fill-none opacity-60" viewBox="0 0 100 50" preserveAspectRatio="none">
                                <path d="M0,25 Q50,0 100,25 Q50,50 0,25 Z" />
                            </svg>
                        </span> of a poet.
                    </h2>

                    <div className="text-lg md:text-xl text-[#1A1A18]/80 leading-relaxed space-y-6 font-serif">
                        <p>
                            I believe the web should feel like paper—<span className="font-hand text-[#1A1A18]">tactile</span>, <span className="font-hand text-[#1A1A18]">intentional</span>, and <span className="font-hand text-[#1A1A18]">calm</span>.
                        </p>
                        <p>
                            My work is a study in <HighlighterSpan color="#FFE4BC" delay={0.2}>Human-in-the-Loop</HighlighterSpan> systems.
                            We don't just build interfaces; we build environments for thought.
                        </p>
                        <p>
                            Drawing inspiration from natural phenomena and archival aesthetics, I craft digital artifacts that age gracefully.
                        </p>
                    </div>

                    {/* Signature */}
                    <div className="mt-8 pt-8 border-t border-[#1A1A18]/10 font-hand text-3xl text-[#1A1A18] opacity-60 rotate-[-2deg]">
                        Ryan Jun
                    </div>
                </div>

            </div>
        </section>
    );
}
