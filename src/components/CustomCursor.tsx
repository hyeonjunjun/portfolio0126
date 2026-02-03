"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [label, setLabel] = useState("");

    // Smooth spring physics for fluid movement
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for interactive elements
            const interactive = target.closest('a, button, [role="button"], [data-cursor-interactive]');
            setIsHovering(!!interactive);

            // Check for specific cursor labels
            const labelElement = target.closest('[data-cursor-label]');
            if (labelElement) {
                const text = labelElement.getAttribute('data-cursor-label');
                setLabel(text || "");
            } else {
                setLabel("");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHover);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            style={{
                translateX: springX,
                translateY: springY,
                x: "-50%",
                y: "-50%",
            }}
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        >
            {/* Base Dot */}
            <motion.div
                animate={{
                    scale: label ? 0 : (isHovering ? 1.5 : 1),
                    opacity: label ? 0 : 1
                }}
                className="w-3 h-3 bg-white rounded-full mix-blend-difference"
            />

            {/* Expanded Label */}
            <AnimatePresence>
                {label && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full font-serif italic text-xs tracking-widest uppercase whitespace-nowrap shadow-xl"
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
