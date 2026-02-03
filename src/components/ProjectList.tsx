"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        id: "01",
        title: "SIFT MOBILE",
        category: "Mobile App",
        year: "2024",
        description: "Curating digital noise.",
    },
    {
        id: "02",
        title: "ANTIGRAVITY",
        category: "Design System",
        year: "2024",
        description: "Physics interaction language.",
    },
    {
        id: "03",
        title: "LUMA INTERFACE",
        category: "Web Platform",
        year: "2023",
        description: "Reimagining light.",
    },
    {
        id: "04",
        title: "MONO/POLY",
        category: "Experiment",
        year: "2023",
        description: "Audiovisual synthesis.",
    }
];

export default function ProjectList() {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <section className="w-full min-h-screen py-20 relative bg-[#0C0A0A]/40 backdrop-blur-md" onMouseMove={handleMouseMove}>

            {/* Architectural Vertical Labels */}
            <div className="absolute left-8 md:left-12 top-0 h-full hidden md:flex flex-col justify-between items-center pointer-events-none z-10 border-r border-amber-400/5 pr-4">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#A8A29E] [writing-mode:vertical-rl] rotate-180"
                >
                    Selected Works
                </motion.span>
            </div>

            <div className="absolute right-8 md:right-12 top-0 h-full hidden md:flex flex-col justify-between items-center pointer-events-none z-10 border-l border-amber-400/5 pl-4">
                <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#A8A29E] [writing-mode:vertical-rl] rotate-180"
                >
                    EST. 2024 — 2026
                </motion.span>
            </div>

            {/* THE LIST */}
            <div className="w-full max-w-[85vw] mx-auto flex flex-col pt-20">
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        className="group relative border-b border-amber-400/10 py-16 md:py-24 cursor-pointer transition-colors hover:bg-white/5"
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        {/* Row Content */}
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 px-4 md:px-0">

                            {/* ID + Title with Mask Reveal */}
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 pl-4 md:pl-0">
                                <span className="font-mono text-xs md:text-sm text-[#A8A29E] w-12">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>

                                <div className="overflow-hidden">
                                    <motion.h2
                                        initial={{ y: "100%" }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                        className="text-6xl md:text-[9vw] font-serif leading-[0.8] text-[#FEF3C7] group-hover:italic transition-all duration-500"
                                    >
                                        {project.title}
                                    </motion.h2>
                                </div>
                            </div>

                            {/* Meta (Right) */}
                            <div className="flex items-center gap-12 pr-4 md:pr-0">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A29E] w-32 text-right hidden md:block">
                                    {project.category}
                                </span>
                                <ArrowUpRight className="w-6 h-6 text-amber-100/20 group-hover:text-[#FDB9C8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* FLOATING IMAGE REVEAL (Martin Briceño Style) */}
            <AnimatePresence>
                {hoveredProject && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.6, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.6, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="fixed pointer-events-none z-50 hidden md:block"
                        style={{
                            left: cursorPos.x,
                            top: cursorPos.y,
                            x: "-50%",
                            y: "-50%"
                        }}
                    >
                        {/* High-End Card Style */}
                        <div className="w-[450px] h-[320px] bg-zinc-900 rounded-sm shadow-2xl overflow-hidden relative border border-white/10 p-1">
                            {/* Mock Visual */}
                            <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-amber-200/20 to-pink-300/20 backdrop-blur-3xl">
                                <div className="absolute inset-0 flex items-center justify-center font-serif italic text-3xl text-[#FEF3C7]/40">
                                    {projects.find(p => p.id === hoveredProject)?.title}
                                </div>

                                {/* Inner soft grain */}
                                <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
