"use client";

import { motion } from "framer-motion";

interface ProjectMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectMenu({ isOpen, onClose }: ProjectMenuProps) {
    const menuItems = [
        { id: "01", label: "Projects" },
        { id: "02", label: "About" },
        { id: "03", label: "Archives" },
        { id: "04", label: "Start a Project" },
        { id: "05", label: "Contact" },
    ];

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? "0%" : "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-full md:w-[65vw] h-full z-[150] bg-[#F5F5F3] text-[#1C1C1C] px-8 md:px-20 py-12 flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
        >
            {/* Header */}
            <div className="flex justify-between items-baseline border-b border-black/10 pb-6 mb-12">
                <h2 className="text-3xl font-serif font-medium">Menu</h2>
                <button
                    onClick={onClose}
                    className="font-mono text-[10px] tracking-widest hover:italic cursor-pointer"
                    data-cursor-label="( Close )"
                >
                    [CLOSE]
                </button>
            </div>

            <div className="flex flex-col md:flex-row h-full">
                {/* LEFT SIDE: METADATA (visible on desktop) */}
                <div className="hidden md:flex flex-1 flex-col justify-between py-6 pr-12">
                    <div className="font-serif italic text-sm">
                        (Index)<sup>05</sup>
                    </div>

                    <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest opacity-60">
                        <span className="opacity-40 mb-2">(Presence)</span>
                        <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">Behance</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">Archive</a>
                    </div>
                </div>

                {/* RIGHT SIDE: MENU ITEMS */}
                <div className="flex-[2] flex flex-col justify-center md:border-l border-black/5 md:pl-20">
                    <div className="flex flex-col gap-10">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="group flex items-baseline gap-6 border-b border-black/5 pb-4 cursor-pointer"
                                data-cursor-label="( Open )"
                            >
                                <span className="font-serif italic text-xs opacity-30">({item.id})</span>
                                <h3 className="text-4xl md:text-5xl font-serif tracking-tight transition-all group-hover:italic group-hover:translate-x-4">
                                    {item.label}
                                </h3>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-2 h-2 border border-black rotate-45" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-12 flex justify-between font-mono text-[9px] tracking-widest opacity-40 uppercase">
                        <span>©2026 Edition</span>
                        <span>Shift Through Noise</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
