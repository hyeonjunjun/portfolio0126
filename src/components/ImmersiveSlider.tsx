"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "../constants/projects"; // Relative import fix
import RadialTextFade from "./RadialTextFade";

interface ImmersiveSliderProps {
    onProjectClick: (project: Project) => void;
    isPaused: boolean;
    className?: string;
    activeIndex?: number; // Controlled Mode
}

export default function ImmersiveSlider({ onProjectClick, isPaused, className = "", activeIndex = 0 }: ImmersiveSliderProps) {
    // Controlled Mode: Index comes from parent scroll
    const index = activeIndex;

    // Direction calculation (derived from index change)
    const [prevIndex, setPrevIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (index > prevIndex) setDirection(1);
        else if (index < prevIndex) setDirection(-1);
        else setDirection(0);

        setPrevIndex(index);
    }, [index]);

    const activeProject = PROJECTS[index] || PROJECTS[0];

    return (
        <section className={`relative w-full h-screen overflow-hidden bg-transparent text-black ${className}`}>

            {/* FULL BLEED BACKGROUND - DELAYED TRANSITION */}
            <div
                className="absolute inset-0 z-0 cursor-pointer"
                onClick={() => !isPaused && onProjectClick(activeProject)}
                data-cursor-label="( View )"
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={activeProject.id}
                        initial={{
                            opacity: 0,
                            scale: 1.1,
                            filter: "blur(40px) brightness(1.5)",
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: isPaused ? "blur(30px) brightness(1)" : "blur(0px) brightness(1)"
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.05,
                            filter: "blur(60px) brightness(0.8)",
                        }}
                        transition={{
                            duration: 1.8,
                            ease: [0.25, 1, 0.5, 1]
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={activeProject.media}
                            className="w-full h-full object-cover opacity-60"
                            alt={activeProject.title}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* PROJECT METADATA - TOP LEFT */}
            <div className="absolute top-12 left-12 z-40 pointer-events-none">
                <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col gap-1"
                >
                    <span className="font-mono text-[10px] tracking-[0.3em] text-black/40 uppercase">
                        [{activeProject.category}]
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-black/20">
                        {index + 1} / {PROJECTS.length}
                    </span>
                </motion.div>
            </div>

            {/* MAIN CONTENT OVERLAY */}
            <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-center px-12 md:px-24">
                <div className="max-w-6xl w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{
                                duration: 1.2,
                                ease: [0.25, 1, 0.5, 1]
                            }}
                            className="flex flex-col gap-4"
                        >
                            <h2 className="text-[12vw] md:text-[10vw] font-serif leading-[0.85] tracking-tighter text-black select-none">
                                {activeProject.title}
                            </h2>
                            <p className="text-xl md:text-3xl font-serif font-light text-black/50 max-w-2xl italic leading-tight">
                                {activeProject.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* CURSOR GUIDE / INTERACTION CTA */}
            <div className="absolute bottom-12 left-12 z-40 flex items-center gap-6">
                <div className="group flex items-center gap-3 cursor-pointer pointer-events-auto"
                    onClick={() => !isPaused && onProjectClick(activeProject)}>
                    <div className="w-12 h-px bg-black/20 group-hover:w-20 transition-all duration-700 ease-gentle" />
                    <span className="font-mono text-[10px] tracking-widest text-black/60 group-hover:text-black transition-colors">
                        EXPLORE PROJECT
                    </span>
                </div>
            </div>

            {/* PROGRESS BAR - REMOVED FOR MINIMALISM & BUG FIX */}
            <div className="absolute bottom-12 right-12 z-40 w-48 flex flex-col gap-2 opacity-0">
            </div>

            {/* ATMOSPHERIC NOISE OVERLAY - ADAPTIVE */}
            <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-[0.03]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* THUMBNAIL NAV */}
            <motion.div
                animate={{ opacity: isPaused ? 0 : 1 }}
                className="absolute bottom-12 right-8 z-40 flex gap-3"
            >
                {PROJECTS.map((p: Project, i: number) => (
                    <div
                        key={p.id}
                        className={`w-10 h-7 border border-black/10 overflow-hidden transition-all ${i === index ? "w-20 opacity-100" : "opacity-20"}`}
                        data-cursor-label="( Switch )"
                    >
                        <img src={p.media} className="w-full h-full object-cover" alt="" />
                    </div>
                ))}
            </motion.div>

        </section>
    );
}
