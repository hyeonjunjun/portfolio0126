"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "@/constants/projects";
import { useTextScramble } from "@/hooks/useTextScramble";
import Link from "next/link";

/**
 * ProjectShowcase
 * ───────────────
 * A high-fidelity vertical series that uses viewport pinning and 
 * cinematic reveals to tell the story of each project.
 */
export default function ProjectShowcase() {
    return (
        <section className="relative">
            {PROJECTS.map((project, index) => (
                <ShowcaseSlide key={project.id} project={project} index={index} />
            ))}
        </section>
    );
}

function ShowcaseSlide({ project, index }: { project: any, index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const { displayText: scrambledTitle, scramble } = useTextScramble(project.title);

    // Parallax and Reveal transforms
    const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
    const imgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative h-[200vh] w-full"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* ─── Background Layer (Parallax) ─── */}
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ scale: imgScale, opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.2, 0.2, 0.1]) }}
                >
                    <img
                        src={project.image}
                        alt=""
                        className="w-full h-full object-cover grayscale brightness-50"
                    />
                </motion.div>

                {/* ─── Main Content Deck ─── */}
                <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center text-center">

                    {/* Visual Specimen */}
                    <Link href={`/work/${project.id}`}>
                        <motion.div
                            className="relative w-[280px] sm:w-[480px] aspect-[4/5] bg-ink/5 rounded-sm overflow-hidden shadow-2xl group cursor-pointer"
                            style={{ opacity: imgOpacity }}
                            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                            />

                            {/* Hover Reveal Overlay */}
                            <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <span className="font-pixel text-[8px] tracking-[0.3em] uppercase text-white bg-black/40 backdrop-blur-md px-4 py-2">View Specimen</span>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Metadata Overlay (Paolo Style) */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center"
                        style={{ y: textY, opacity: textOpacity }}
                    >
                        <div className="mb-4 sm:mb-8 overflow-hidden">
                            <span className="font-pixel text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-ink-muted/60 block">
                                Specimen Nᵒ0{index + 1}
                            </span>
                        </div>

                        <h2
                            className="font-display italic text-[clamp(4.5rem,15vw,13rem)] leading-[0.85] text-ink drop-shadow-2xl mix-blend-difference"
                            onMouseEnter={scramble}
                        >
                            {scrambledTitle}
                        </h2>

                        <div className="mt-8 sm:mt-12 flex gap-8 font-pixel text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-ink-muted/80">
                            <span className="bg-base/40 backdrop-blur-sm px-4 py-2 border border-ink/5 rounded-full">{project.sector}</span>
                            <span className="opacity-20 self-center">/</span>
                            <span className="bg-base/40 backdrop-blur-sm px-4 py-2 border border-ink/5 rounded-full">{project.year}</span>
                        </div>
                    </motion.div>
                </div>

                {/* ─── Progress Tracker (Vertical) ─── */}
                <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-30">
                    <span className="font-pixel text-[10px] text-accent">{String(index + 1).padStart(2, '0')}</span>
                    <div className="h-20 w-[1px] bg-ink/5 relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-accent origin-top"
                            style={{ scaleY: scrollYProgress }}
                        />
                    </div>
                    <span className="font-pixel text-[10px] text-ink-faint">{String(PROJECTS.length).padStart(2, '0')}</span>
                </div>
            </div>
        </div>
    );
}
