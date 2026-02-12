"use client";

import { motion } from "framer-motion";
import { Project } from "@/constants/projects";
import HandDrawnDivider from "./HandDrawnDivider";
import InkButton from "./InkButton";
import HighlighterSpan from "./HighlighterSpan";

interface ProjectDetailProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    return (
        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[100] bg-[#F2F0E9] text-[#1A1A18] overflow-y-auto no-scrollbar"
        >
            {/* Sticky Header */}
            <div className="sticky top-0 left-0 w-full z-10 flex justify-between items-center px-6 py-4 bg-[#F2F0E9]/90 backdrop-blur-sm border-b border-[#1A1A18]/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D94E1E]">
                    File No. {project.id}
                </span>
                <button
                    onClick={onClose}
                    className="font-mono text-xs uppercase tracking-widest hover:line-through decoration-[#D94E1E] decoration-2"
                >
                    [Close Archive]
                </button>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-20">

                {/* Title Section */}
                <div className="text-center mb-16">
                    <span className="font-serif italic text-xl text-[#1A1A18]/60 mb-4 block">
                        Case Study: {project.category}
                    </span>
                    <h1 className="font-serif text-6xl md:text-8xl text-[#1A1A18] mb-8 leading-[0.9]">
                        {project.title}
                    </h1>
                    <p className="font-serif text-xl md:text-2xl text-[#1A1A18]/80 max-w-2xl mx-auto leading-relaxed">
                        {project.description}
                    </p>
                </div>

                {/* Meta Data Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-[#1A1A18]/10 py-8 mb-20">
                    <div>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-[#D94E1E] mb-2">Role</span>
                        <span className="font-serif text-lg">{project.role}</span>
                    </div>
                    <div>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-[#D94E1E] mb-2">Year</span>
                        <span className="font-serif text-lg">{project.year}</span>
                    </div>
                    <div>
                        <span className="block font-mono text-[10px] uppercase tracking-widest text-[#D94E1E] mb-2">Output</span>
                        <span className="font-serif text-lg">{project.category}</span>
                    </div>
                    <div className="flex items-center justify-end">
                        {/* Live Link Button */}
                        <a href={project.media || "#"} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-[#D94E1E]">
                            Open File <span>↗</span>
                        </a>
                    </div>
                </div>

                {/* Field Report Content */}
                <div className="space-y-24">

                    {/* The Observation (Problem) */}
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px] bg-[#D94E1E]" />
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D94E1E]">
                                01. The Observation
                            </h3>
                        </div>
                        <h4 className="font-serif text-3xl md:text-4xl mb-6">
                            Identifying the <HighlighterSpan color="#FFE4BC" delay={0.2}>signal</HighlighterSpan> in the noise.
                        </h4>
                        <p className="font-serif text-lg leading-relaxed text-[#1A1A18]/80 columns-1 md:columns-2 gap-12">
                            Every project begins with a question. For {project.title}, we observed a disconnect between the digital interface and the human intent. The goal was to bridge this gap using tactile interactions and fluid motion.
                            <br /><br />
                            We approached this problem like archaelogists, digging through the layers of user needs to find the core purpose. The result is a system that feels inevitable.
                        </p>
                    </section>

                    <div className="w-full aspect-video bg-[#E5E5E5] relative grayscale contrast-125 overflow-hidden shadow-lg rotate-1 my-12">
                        {/* Image Placeholder */}
                        <img src={project.media} alt="Process" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#F2F0E9] mix-blend-multiply opacity-20" />
                    </div>

                    {/* The Hypothesis (Solution) */}
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px] bg-[#D94E1E]" />
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D94E1E]">
                                02. The Hypothesis
                            </h3>
                        </div>
                        <h4 className="font-serif text-3xl md:text-4xl mb-6">
                            Constructing a logic of <span className="italic">weight</span> and <span className="italic">texture</span>.
                        </h4>
                        <p className="font-serif text-lg leading-relaxed text-[#1A1A18]/80">
                            Our solution focused on the concept of "Digital Materiality." By treating UI elements as physical objects with mass and friction, we created an environment that respects user attention. The typography (using Fraunces and JetBrains Mono) reinforces this duality of the mechanical and the organic.
                        </p>
                    </section>

                    <HandDrawnDivider className="my-16" />

                    {/* The Synthesis (Result) */}
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-[1px] bg-[#D94E1E]" />
                            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D94E1E]">
                                03. The Synthesis
                            </h3>
                        </div>
                        <div className="bg-white p-8 md:p-12 shadow-sm border border-[#1A1A18]/5">
                            <p className="font-serif text-xl md:text-2xl italic text-center leading-relaxed">
                                "{project.subtitle || "A digital artifact that stands the test of time."}"
                            </p>
                        </div>
                    </section>

                </div>

                {/* Footer / Next */}
                <div className="mt-32 flex justify-center">
                    <InkButton onClick={onClose}>
                        Return to Archive
                    </InkButton>
                </div>

            </div>
        </motion.div>
    );
}
