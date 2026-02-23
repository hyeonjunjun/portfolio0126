"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface RollingLinkProps {
    href: string;
    label: string;
    onClick?: () => void;
}

/**
 * RollingLink
 * ───────────
 * Per-letter 3D rotateX turn with staggered timing.
 * Each character rotates in-place — no position shift, one continuous location.
 * The full 360° turn creates a "card flip" illusion while the text stays put.
 */
export default function RollingLink({ href, label, onClick }: RollingLinkProps) {
    const [isHovered, setIsHovered] = useState(false);

    const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#");
    const Component = isExternal ? "a" : Link;
    const props = isExternal
        ? {
            href,
            onClick,
            target: href.startsWith("http") ? "_blank" : undefined,
            rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
        }
        : { href, onClick };

    const chars = label.split("");
    const STAGGER = 0.03; // seconds between each letter

    // @ts-ignore - Dynamic component props typing
    return (
        <Component
            {...props}
            className="relative flex items-center group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: "600px" }}
        >
            {chars.map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    className="font-pixel text-[9px] tracking-[0.2em] uppercase text-ink-muted inline-block"
                    style={{
                        transformStyle: "preserve-3d",
                        display: "inline-block",
                        /* prevent whitespace collapse */
                        whiteSpace: "pre",
                    }}
                    animate={{
                        rotateX: isHovered ? 360 : 0,
                        color: isHovered
                            ? "var(--color-accent, #8b9e6b)"
                            : "var(--color-ink-muted, rgba(0,0,0,0.4))",
                    }}
                    transition={{
                        rotateX: {
                            duration: 0.6,
                            delay: i * STAGGER,
                            ease: [0.16, 1, 0.3, 1],
                        },
                        color: {
                            duration: 0.3,
                            delay: i * STAGGER,
                            ease: "easeOut",
                        },
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </Component>
    );
}
