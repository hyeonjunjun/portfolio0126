"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface TapeLabelProps {
    text: string;
    href?: string; // Optional: Make it a link if provided
    isActive?: boolean;
    className?: string;
    angle?: number;
}

export default function TapeLabel({ text, href, isActive = false, className = "", angle = -2 }: TapeLabelProps) {
    const content = (
        <div className={`
      relative px-4 py-1 
      bg-[#E8E1D0] 
      shadow-[0_1px_2px_rgba(0,0,0,0.15)]
      flex items-center justify-center
      ${isActive ? "font-bold text-neutral-900" : "font-medium text-neutral-600"}
      ${className}
    `}>
            {/* Torn edges simulation with clip-path (simplified) or pseudo-elements could go here. 
          For now using a jagged border image or CSS hacks is complex, 
          so we'll stick to a slightly irregular opacity mask or just a box with rotation.
      */}

            {/* Tape Text */}
            <span className="font-mono text-xs tracking-wider uppercase z-10">
                {text}
            </span>

            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20 pointer-events-none" />

            {/* Sticky residue hints */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/30" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/5" />
        </div>
    );

    return (
        <motion.div
            whileHover={{ scale: 1.05, rotate: angle + (Math.random() * 2 - 1) }}
            whileTap={{ scale: 0.95 }}
            initial={{ rotate: angle }}
            className="inline-block"
        >
            {href ? <Link href={href}>{content}</Link> : content}
        </motion.div>
    );
}
