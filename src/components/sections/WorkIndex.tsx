"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS } from "@/constants/projects";
import Link from "next/link";
import Image from "next/image";

/**
 * ProjectGridItem
 * ───────────────
 * A high-fidelity, architectural grid item.
 * Features: Slow hover zoom, massive serif title overlay, and technical serials.
 */
function ProjectGridItem({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    // Determine aspect ratio/size for "Asymmetrical Rhythm"
    const isLarge = index === 0; // First item is the centerpiece
    const isPortrait = index % 3 === 1; // Middle items of rhythmic rows are portrait

    // Merge refs
    const setRefs = (node: HTMLDivElement) => {
        itemRef.current = node;
        inViewRef(node);
    };

    return (
        <motion.div
            ref={setRefs}
            className={`group relative overflow-hidden rounded-sm bg-ink/[0.03] transition-all duration-[1200ms] ${isLarge ? "lg:col-span-8 lg:row-span-2 aspect-[4/3] lg:aspect-auto" :
                    isPortrait ? "lg:col-span-4 aspect-[4/5]" :
                        "lg:col-span-4 aspect-[16/10]"
                }`}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            <Link href={`/work/${project.id}`} className="block w-full h-full group/link">
                {/* Background Image with Slow Zoom */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-[4000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:scale-110"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority={index < 3}
                    />
                    {/* Atmospheric Dark Overlay (Fades in on hover) */}
                    <div className="absolute inset-0 bg-ink opacity-0 group-hover/link:opacity-40 transition-opacity duration-1000 z-10" />
                </div>

                {/* Technical Meta Tag (Always visible) */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                    <span className="font-pixel text-[9px] tracking-[0.4em] text-white/40 group-hover/link:text-white transition-colors duration-700">
                        S.{String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-6 h-px bg-white/10 group-hover/link:w-12 group-hover/link:bg-accent transition-all duration-700" />
                </div>

                {/* Content Overlay (Centered & Massive on Hover) */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 opacity-0 group-hover/link:opacity-100 transition-opacity duration-1000">
                    <motion.div
                        className="text-center"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                    >
                        <h3 className="font-display italic text-[clamp(2rem,6vw,5rem)] leading-none tracking-[-0.04em] text-white selection:bg-accent selection:text-white mb-4">
                            {project.title}
                        </h3>
                        <div className="flex items-center justify-center gap-4">
                            <span className="font-pixel text-[8px] tracking-[0.3em] uppercase text-white/60">{project.sector}</span>
                            <div className="w-3 h-3 rounded-full border border-white/20 flex items-center justify-center">
                                <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                            </div>
                            <span className="font-pixel text-[8px] tracking-[0.3em] uppercase text-white/60">{project.year}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Corner Label (Technical Spec) */}
                <div className="absolute bottom-6 left-6 z-20 pointer-events-none group-hover/link:translate-x-2 transition-transform duration-700">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-white/0 group-hover/link:text-white/60 transition-colors duration-1000">
                        VIEW PROJECT —&gt;
                    </span>
                </div>
            </Link>

            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.05] bg-noise" />
        </motion.div>
    );
}

export default function WorkIndex() {
    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const sectionRef = useRef<HTMLElement>(null);

    // Global Scroll Progress for subtle parallax
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <section
            ref={sectionRef}
            id="work"
            className="relative bg-canvas py-32 lg:py-64 overflow-hidden"
        >
            <div className="px-6 sm:px-12 lg:px-20 relative z-10">
                {/* ─── Architectural Header ─── */}
                <motion.div
                    ref={headerRef}
                    className="mb-24 lg:mb-40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-ink/[0.08] pb-12">
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="font-pixel text-[10px] tracking-[0.4em] text-accent uppercase">Selected Work</span>
                                <div className="h-px w-24 bg-accent/20" />
                                <span className="font-pixel text-[10px] tracking-[0.4em] text-ink-faint uppercase">Gallery.V3</span>
                            </div>
                            <h2 className="font-display italic text-[clamp(4rem,15vw,10rem)] leading-[0.75] tracking-[-0.05em] text-ink">
                                Projects
                            </h2>
                        </div>
                        <div className="lg:col-span-4 lg:text-right">
                            <p className="font-sans text-xs text-ink-muted uppercase tracking-[0.2em] leading-relaxed max-w-[280px] lg:ml-auto">
                                A curated display of digital habitats and experimental interfaces built for the future.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ─── The Studio Dado Grid ─── */}
                <motion.div
                    style={{ y: yParallax }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-min"
                >
                    {PROJECTS.map((project, index) => (
                        <ProjectGridItem
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* Footer anchor for the section */}
                <div className="mt-32 lg:mt-64 flex justify-between items-end border-t border-ink/[0.08] pt-12">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col gap-1">
                            <span className="font-pixel text-[9px] text-ink-faint uppercase tracking-widest">Display Mode</span>
                            <span className="font-pixel text-[10px] text-accent uppercase tracking-[0.3em]">Architectural Gallery / Mode.B</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="font-pixel text-[10px] text-ink-faint uppercase tracking-[0.4em]">Studio Nabi — 2026</span>
                    </div>
                </div>
            </div>

            {/* Section Guides (Architectural vertical lines) */}
            <div className="absolute left-[8.33%] top-0 bottom-0 w-px bg-ink/[0.02] pointer-events-none" />
            <div className="absolute left-[91.66%] top-0 bottom-0 w-px bg-ink/[0.02] pointer-events-none" />
        </section>
    );
}
