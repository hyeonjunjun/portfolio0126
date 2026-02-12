"use client";

import Link from "next/link";
import HandDrawnDivider from "./HandDrawnDivider";

export default function LandingFooter() {
    return (
        <footer className="w-full bg-[#F2F0E9] text-[#1A1A18] pt-24 pb-12 px-8 overflow-hidden relative">
            {/* Top Texture Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#1A1A18] opacity-10" />

            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                <HandDrawnDivider className="mb-12" />

                {/* The Stamp */}
                <div className="relative group cursor-pointer mb-16">
                    <div className="w-48 h-48 rounded-full border-4 border-[#D94E1E] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity rotate-[-12deg] group-hover:rotate-[-5deg] duration-300 ease-out">
                        <div className="text-[#D94E1E] font-serif text-center leading-none p-2">
                            <div className="text-sm uppercase tracking-widest mb-1">Ryan Jun</div>
                            <div className="text-4xl font-bold">DIGITAL<br />ARTISAN</div>
                            <div className="text-xs font-mono mt-2">EST. 2026</div>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 font-mono text-sm uppercase tracking-widest text-[#1A1A18]/60">
                    <Link href="/" className="hover:text-[#D94E1E] hover:underline underline-offset-4 decoration-wavy">Work</Link>
                    <Link href="/about" className="hover:text-[#D94E1E] hover:underline underline-offset-4 decoration-wavy">About</Link>
                    <Link href="/lab" className="hover:text-[#D94E1E] hover:underline underline-offset-4 decoration-wavy">The Lab</Link>
                    <Link href="mailto:hello@ryanjun.com" className="hover:text-[#D94E1E] hover:underline underline-offset-4 decoration-wavy">Contact</Link>
                </div>

                {/* Copyright */}
                <div className="mt-16 text-xs font-serif italic opacity-40">
                    &copy; 2026 Ryan Jun. Code is Craft.
                </div>
            </div>
        </footer>
    );
}
