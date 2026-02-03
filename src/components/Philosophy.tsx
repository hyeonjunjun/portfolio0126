"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Philosophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Reveal animation
    const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1]);

    return (
        <section ref={containerRef} className="relative w-full min-h-[80vh] bg-[#0C0A0A] flex items-center justify-center py-32 px-8">
            <motion.div
                style={{ opacity, scale }}
                className="max-w-4xl text-center"
            >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight text-white mb-12">
                    In an era of infinite content,<br />
                    <span className="italic text-white/40">curation is the only luxury.</span>
                </h2>
                <div className="flex flex-col gap-6 text-base md:text-lg text-white/60 font-serif leading-relaxed max-w-xl mx-auto">
                    <p>
                        We build digital spaces that honor the physics of the real world—
                        weight, inertia, and light—while removing the friction of reality.
                    </p>
                    <p>
                        Every pixel is placed with intention. Every interaction is measured.
                        We don't just design interfaces; we engineer atmosphere.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
