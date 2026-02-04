"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Ethos() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
    const yDrift = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const items = [
        { label: "PRECISION", value: "Crafted with mechanical accuracy and digital soul." },
        { label: "NUANCE", value: "The difference between an interface and an experience." },
        { label: "INERTIA", value: "Movement that honors the weight of intention." }
    ];

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center py-32 px-8 overflow-hidden">
            <motion.div
                style={{ opacity }}
                className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center"
            >
                {/* BIG TITLE */}
                <div className="lg:col-span-12 mb-12">
                    <motion.h3
                        style={{ y: yDrift }}
                        className="text-[12vw] font-serif leading-none tracking-tighter text-black/5 select-none"
                    >
                        STANDARDS
                    </motion.h3>
                </div>

                {/* FEATURE GRID */}
                <div className="lg:col-span-8 lg:col-start-3 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{
                                duration: 1.2,
                                delay: i * 0.2,
                                ease: [0.25, 1, 0.5, 1]
                            }}
                            className="flex flex-col gap-6 group"
                        >
                            <div className="w-8 h-px bg-black/20 group-hover:w-full transition-all duration-1000 ease-gentle" />
                            <div className="font-mono text-[10px] tracking-[0.4em] text-black/40 uppercase font-light">
                                [{item.label}]
                            </div>
                            <p className="text-xl md:text-2xl font-serif text-black/80 leading-snug font-light italic">
                                {item.value}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* DECORATIVE CROSSHAIR ELEMENT */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5 flex items-center justify-center">
                <div className="w-[80vw] h-[1px] bg-black" />
                <div className="h-[80vh] w-[1px] bg-black absolute" />
            </div>
        </section>
    );
}
