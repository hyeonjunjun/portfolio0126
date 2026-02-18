"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useStudioStore } from "@/lib/store";

/**
 * CurtainPreloader
 * ─────────────────
 * A solid canvas-colored curtain that covers the viewport on mount,
 * then slides upward to "unveil" the site. Removes itself after animation.
 */
export default function CurtainPreloader() {
    const [visible, setVisible] = useState(true);
    const setLoaded = useStudioStore((s) => s.setLoaded);

    useEffect(() => {
        // Simulate asset readiness — in production, gate on actual 3D load
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 800);
        return () => clearTimeout(timer);
    }, [setLoaded]);

    const isLoaded = useStudioStore((s) => s.isLoaded);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="fixed inset-0 z-[60] bg-canvas flex items-center justify-center"
                    initial={{ y: 0 }}
                    animate={isLoaded ? { y: "-100%" } : { y: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.76, 0, 0.24, 1], // custom cubic-bezier — smooth "curtain pull"
                    }}
                    onAnimationComplete={() => {
                        if (isLoaded) setVisible(false);
                    }}
                >
                    {/* Minimal loader text while curtain is visible */}
                    <motion.span
                        className="font-mono text-xs tracking-[0.3em] uppercase text-ink-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Studio Nabi
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
