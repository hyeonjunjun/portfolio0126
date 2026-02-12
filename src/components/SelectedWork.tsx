"use client";

import { motion } from "framer-motion";
import PolaroidCard from "./PolaroidCard";
import HandDrawnDivider from "./HandDrawnDivider";

// Mock data similar to constants but with images that work
const projects = [
    {
        id: "01",
        title: "SIFT Mobile",
        category: "Mobile App",
        year: "2024",
        src: "/sift_mobile.png", // Ensure you have these or use placeholders
        description: "Curating digital noise.",
        href: "#",
        rotation: -2,
        margin: "mt-0"
    },
    {
        id: "02",
        title: "Antigravity",
        category: "Design System",
        year: "2024",
        src: "/antigravity.png",
        description: "Physics-based interaction.",
        href: "#",
        rotation: 3,
        margin: "mt-12 md:mt-24"
    },
    {
        id: "03",
        title: "Luma Interface",
        category: "Web Platform",
        year: "2023",
        src: "/luma.png",
        description: "Reimagining light.",
        href: "#",
        rotation: -1,
        margin: "mt-6 md:mt-12"
    },
    {
        id: "04",
        title: "Mono/Poly",
        category: "Experiment",
        year: "2023",
        src: "/mono.png",
        description: "Audiovisual synthesis.",
        href: "#",
        rotation: 4,
        margin: "mt-16 md:mt-32"
    }
];

export default function SelectedWork({ onSelect }: { onSelect?: (id: string) => void }) {
    return (
        <section id="work" className="w-full py-24 px-6 md:px-12 bg-[#F2F0E9] relative overflow-hidden">

            {/* Texture Background for the Table */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%">
                    <filter id="wood-grain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#wood-grain)" opacity="0.4" />
                </svg>
            </div>

            <div className="max-w-[1920px] mx-auto relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center mb-24 md:mb-32">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D94E1E] mb-4">
                        Field Note 002
                    </span>
                    <h2 className="font-serif text-5xl md:text-7xl text-[#1A1A18] text-center">
                        The Physical<br />
                        <span className="italic opacity-60">Archive</span>
                    </h2>
                    <HandDrawnDivider className="max-w-xs mt-8" />
                </div>

                {/* The "Scattered Table" Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-8 w-full max-w-7xl mx-auto">
                    {projects.map((project, i) => (
                        <div
                            key={project.id}
                            className={`
                                col-span-1 lg:col-span-6 flex justify-center
                                ${project.margin}
                                ${i % 2 === 0 ? "lg:justify-end lg:pr-12" : "lg:justify-start lg:pl-12"}
                            `}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50, rotate: 0 }}
                                whileInView={{ opacity: 1, y: 0, rotate: project.rotation }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                                onClick={() => onSelect?.(project.id)}
                                className="cursor-pointer"
                            >
                                <PolaroidCard
                                    title={project.title}
                                    caption={`${project.category} — ${project.year}`}
                                    imageSrc={project.src}
                                    className="w-[300px] md:w-[380px] hover:scale-105 transition-transform duration-300"
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
