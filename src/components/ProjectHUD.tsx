"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectHUDProps {
    onMenuToggle: () => void;
    isMenuOpen: boolean;
}

export default function ProjectHUD({ onMenuToggle, isMenuOpen }: ProjectHUDProps) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
            setTime(timeStr);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-[120] px-8 py-6 flex justify-between items-baseline text-white pointer-events-none">
            <div className="flex-1">
                <Link href="/" className="font-serif text-base font-normal tracking-widest uppercase pointer-events-auto">
                    HKJSTUDIO©
                </Link>
            </div>

            <div className="flex-1 flex justify-center hidden md:flex">
                <span className="font-serif italic text-[13px] tracking-[0.2em] uppercase opacity-100">
                    Product Designer & Design Engineer
                </span>
            </div>

            <div className="flex-1 flex justify-end items-center gap-12">
                <div className="font-mono text-[13px] tracking-widest opacity-100">
                    [EST] {time}
                </div>

                <button
                    onClick={onMenuToggle}
                    className="group flex flex-col gap-1.5 w-6 cursor-pointer relative h-3 justify-center pointer-events-auto"
                >
                    <motion.div
                        animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            y: isMenuOpen ? 1 : 0
                        }}
                        className="w-full h-[1px] bg-white origin-center"
                    />
                    <motion.div
                        animate={{
                            rotate: isMenuOpen ? -45 : 0,
                            y: isMenuOpen ? -1 : 0
                        }}
                        className="w-full h-[1px] bg-white origin-center"
                    />
                </button>
            </div>
        </nav>
    );
}
