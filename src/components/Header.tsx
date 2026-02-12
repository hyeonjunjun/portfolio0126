"use client";

import Link from "next/link";
import TapeLabel from "@/components/TapeLabel";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Work", href: "#work" },
    { name: "The Lab", href: "#lab" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-300
                ${scrolled ? "py-2 bg-[#F2F0E9]/90 backdrop-blur-sm shadow-sm" : "py-6 bg-transparent"}
            `}
        >
            {/* Torn Edge Border (Simple CSS trick or SVG) */}
            <div
                className={`
                    absolute bottom-0 left-0 w-full h-[6px] 
                    bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgMTIgNiIgZmlsbD0iI0YyRjBFOSI+PHBhdGggZD0iTTAgNkw2IDBMMTIgNkgwWiIvPjwvc3ZnPg==')]
                    opacity-0 transition-opacity duration-300
                    ${scrolled ? "opacity-100" : ""}
                `}
            />

            <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between px-6 md:px-12">
                {/* LOGO */}
                <Link href="/" className="relative group">
                    <span className="font-serif text-xl font-bold tracking-tight text-[#1A1A18] group-hover:opacity-60 transition-opacity">
                        RYAN JUN
                    </span>
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#D94E1E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>

                {/* NAV */}
                <nav className="flex items-center gap-4 md:gap-8">
                    {navItems.map((item, i) => (
                        <TapeLabel
                            key={item.name}
                            text={item.name}
                            href={item.href}
                            angle={i % 2 === 0 ? -1 : 1}
                            className="hidden md:block"
                        />
                    ))}

                    {/* Mobile Menu Button (Placeholder) */}
                    <button className="md:hidden font-mono text-sm uppercase border border-[#1A1A18] px-3 py-1 rounded-sm">
                        Menu
                    </button>
                </nav>
            </div>
        </header>
    );
}
