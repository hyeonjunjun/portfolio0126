"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Philosophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Reveal animation - Organic Drift
    const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.99, 1]);
    const driftY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-48 px-8 overflow-hidden">
            <motion.div
                style={{ opacity, scale, y: driftY }}
                className="max-w-5xl text-center"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-black mb-20 tracking-tight">
                    In an era of <span className="italic font-light opacity-80">infinite</span> content,<br />
                    <span className="text-black/30 font-light">curation is the only </span>
                    <span className="italic serif-italic">luxury.</span>
                </h2>

                <div className="flex flex-col md:flex-row gap-12 md:gap-24 text-left border-t border-black/5 pt-12">
                    <div className="flex-1">
                        <p className="text-lg md:text-xl text-black/50 font-serif leading-relaxed font-light">
                            We build digital spaces that honor the physics of the real world—
                            weight, inertia, and light—while removing the friction of reality.
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="text-lg md:text-xl text-black/50 font-serif leading-relaxed font-light">
                            Every pixel is placed with intention. Every interaction is measured.
                            We don't just design interfaces; we engineer atmosphere.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
