"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function CustomScrollbar() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed right-0 top-0 h-screen w-3 z-[100] mix-blend-difference pointer-events-none hidden md:block">
            {/* Track Line */}
            <div className="absolute right-[5px] top-0 h-full w-[1px] bg-white/20" />

            {/* Thumb */}
            <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="absolute right-[3px] top-0 w-[5px] h-full bg-white origin-top"
            />
        </div>
    );
}
