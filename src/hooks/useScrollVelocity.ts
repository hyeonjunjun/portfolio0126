"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

/**
 * useScrollVelocity
 * ─────────────────
 * Returns a spring-damped skewY value based on scroll velocity.
 * Fast scrolling → subtle type compression. Slow/idle → neutral.
 *
 * @param factor  How aggressively to skew (default: 0.5 → max ~5deg at high speeds)
 * @param clampMax  Maximum skew in degrees (default: 4)
 */
export function useScrollVelocity(factor = 0.5, clampMax = 4): MotionValue<number> {
    const rawSkew = useMotionValue(0);
    const smoothSkew = useSpring(rawSkew, { damping: 30, stiffness: 200, mass: 0.5 });

    const lastScrollY = useRef(0);
    const rafId = useRef<number>(0);

    useEffect(() => {
        let prevTime = performance.now();

        const tick = () => {
            const now = performance.now();
            const dt = now - prevTime;
            prevTime = now;

            if (dt > 0) {
                const currentY = window.scrollY;
                const delta = currentY - lastScrollY.current;
                lastScrollY.current = currentY;

                // Velocity in px/ms, then scale to degrees
                const velocity = (delta / Math.max(dt, 1)) * 16; // Normalize to ~per-frame
                const skew = Math.max(-clampMax, Math.min(clampMax, velocity * factor));

                rawSkew.set(skew);
            }

            rafId.current = requestAnimationFrame(tick);
        };

        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, [rawSkew, factor, clampMax]);

    return smoothSkew;
}
