"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS } from "@/constants/projects";
import ProjectShowcase from "@/components/ProjectShowcase";

/**
 * LabSpecimens
 * ────────────
 * Project Index Table.
 * Minimalist vertically stacked entries with dramatic hover reveals.
 */
export default function LabSpecimens() {
    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <section className="relative py-24 sm:py-32">
            {/* ─── Background Layer: Continuity Line ─── */}
            <div className="absolute left-6 sm:left-12 lg:left-20 top-0 bottom-0 w-px bg-ink/[0.06] z-0" />

            <div className="px-6 sm:px-12 lg:px-20 relative z-10 mb-12">
                {/* ─── Korean Cultural Label ─── */}
                <div className="font-dot text-[10px] text-accent mb-4">﹁작품﹂</div>

                {/* ─── Section Header ─── */}
                <motion.div
                    ref={headerRef}
                    className="flex items-baseline justify-between mb-8 border-b border-ink/[0.06] pb-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="font-pixel text-[11px] tracking-[0.2em] uppercase text-ink-muted">
                        Selected Specimens
                    </h2>
                    <span className="font-pixel text-[10px] text-ink-faint tabular-nums">
                        {String(PROJECTS.length).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                    </span>
                </motion.div>

            </div>

            {/* ─── Cinematic Horizontal Showcase ─── */}
            <ProjectShowcase />
        </section>
    );
}
