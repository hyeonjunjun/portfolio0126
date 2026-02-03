"use client";

import { motion } from "framer-motion";
import { PROJECTS, Project } from "@/constants/projects";

interface ProjectDetailProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    // Filter out the current project for the "Explore More" list
    const otherProjects = PROJECTS.filter(p => p.id !== project.id).slice(0, 5);

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-full md:w-[65vw] h-full z-[160] bg-[#0C0A0A] text-white overflow-y-auto no-scrollbar selection:bg-white selection:text-black shadow-[-20px_0_60px_rgba(0,0,0,0.5)] border-l border-white/10"
        >
            {/* STICKY HEADER */}
            <div className="w-full px-8 md:px-20 py-8 flex justify-between items-start border-b border-white/10 bg-[#0C0A0A]/90 backdrop-blur-md sticky top-0 z-50">
                <div className="font-serif italic text-[13px] tracking-wider opacity-60">
                    (Case Study)
                </div>
                <button
                    onClick={onClose}
                    className="font-mono text-[10px] tracking-widest hover:italic cursor-pointer hover:opacity-50 transition-opacity uppercase"
                    data-cursor-label="( Close )"
                >
                    [Close]
                </button>
            </div>

            <div className="max-w-[1400px] mx-auto px-8 md:px-20 py-24">

                {/* NARRATIVE HEADER (Split Layout) */}
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-32">
                    <div className="font-serif text-[13px] tracking-widest uppercase opacity-40 md:w-1/4">
                        {project.category}
                    </div>
                    <div className="md:w-3/4 flex flex-col gap-8">
                        <h1 className="text-4xl md:text-5xl font-serif leading-tight">
                            {project.title} <span className="opacity-40 italic">is a platform for next-gen discovery,</span> {project.subtitle}
                        </h1>
                        <p className="text-lg font-serif text-white opacity-60 leading-relaxed max-w-xl">
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* DETAILS TABLE (Clean Lines) */}
                <div className="mb-32 w-full border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 pt-6 font-serif">
                        {[
                            { label: "Client", value: project.title },
                            { label: "Year", value: project.year },
                            { label: "Location", value: project.location },
                            { label: "Credits", value: project.credits }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <span className="text-[10px] uppercase tracking-widest opacity-40">{item.label}</span>
                                <span className="text-[13px] tracking-wide">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MEDIA SECTION w/ FLOATING ACTION BUTTON */}
                <div className="w-full aspect-video bg-[#121212] relative group overflow-hidden rounded-sm mb-32 border border-white/5">
                    <img
                        src={project.media}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
                        alt=""
                    />

                    {/* Floating Action Button (FAB) */}
                    <div className="absolute bottom-6 right-6 z-20">
                        <button
                            className="bg-white text-black px-6 py-3 rounded-sm flex items-center gap-3 hover:scale-105 transition-transform duration-300 shadow-xl"
                            data-cursor-label="( Visit )"
                        >
                            <div className="w-8 h-8 rounded-sm overflow-hidden relative">
                                <img src={project.media} className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="font-serif text-[13px] tracking-wide">Live Site</span>
                            <span className="text-[10px] opacity-60">↗</span>
                        </button>
                    </div>
                </div>

                {/* EXPLORE MORE (Tabular List) */}
                <div className="w-full pt-12 border-t border-white/10">
                    <div className="flex justify-between items-baseline mb-12">
                        <h2 className="text-[13px] tracking-widest opacity-40 uppercase">Explore More ({otherProjects.length})</h2>
                        <p className="font-serif italic text-white/40 text-sm max-w-xs text-right hidden md:block">
                            A space for exploration, creative concepts, and work-in-progress ideas.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        {/* Table Header */}
                        <div className="hidden md:flex pb-4 border-b border-white/10 font-mono text-[10px] uppercase tracking-widest opacity-40">
                            <div className="w-24">(Index)</div>
                            <div className="flex-1">Title</div>
                            <div className="flex-1">Category</div>
                        </div>

                        {/* List Items */}
                        {otherProjects.map((p, idx) => (
                            <div
                                key={p.id}
                                className="group flex flex-col md:flex-row md:items-center py-6 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors"
                            >
                                <div className="w-24 font-serif italic text-[13px] opacity-40 group-hover:opacity-100 transition-opacity">
                                    ({String(idx + 1).padStart(2, '0')})
                                </div>
                                <div className="flex-1 font-serif text-[16px] tracking-wide mb-2 md:mb-0 group-hover:translate-x-2 transition-transform duration-300">
                                    {p.title}
                                </div>
                                <div className="flex-1 font-serif italic text-[13px] opacity-40">
                                    {p.category}
                                </div>

                                {/* Hover Thumbnail (Hidden by default, could be added) */}
                                <div className="hidden md:block w-16 h-10 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 overflow-hidden">
                                    <img src={p.media} className="w-full h-full object-cover grayscale" alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
