"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PolaroidCardProps {
    imageSrc?: string;
    title: string;
    date?: string;
    caption?: string;
    className?: string;
    onClick?: () => void;
}

export default function PolaroidCard({ imageSrc, title, date, caption, className = "", onClick }: PolaroidCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, rotate: Math.random() * 2 - 1, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative bg-white p-3 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300 ease-stamp cursor-pointer ${className}`}
            style={{
                boxShadow: "2px 4px 12px rgba(0,0,0,0.08), 1px 2px 4px rgba(0,0,0,0.12)",
            }}
        >
            {/* Photo Area */}
            <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden mb-4 filter sepia-[0.2]">
                {imageSrc ? (
                    <Image src={imageSrc} alt={title} fill className="object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                        {/* Placeholder Pattern */}
                        <div className="opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] w-full h-full" />
                    </div>
                )}

                {/* Inner shadow/vignette */}
                <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] pointer-events-none" />
            </div>

            {/* Caption Area */}
            <div className="flex flex-col gap-1 px-1">
                <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-lg text-neutral-800 leading-tight">{title}</h3>
                    {date && <span className="font-mono text-xs text-neutral-400">{date}</span>}
                </div>
                {caption && (
                    <p className="font-hand text-sm text-neutral-600 rotate-[-1deg] opacity-80 mt-1">
                        {caption}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
