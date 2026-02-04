"use client";

import Link from "next/link";

export default function LandingFooter() {
    return (
        <footer className="w-full bg-transparent text-black pt-48 pb-12 px-8 border-t border-black/5 font-serif overflow-hidden">
            <div className="max-w-[1920px] mx-auto flex flex-col justify-between min-h-[70vh]">

                {/* TOP: BIG LINKS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                    <div className="relative">
                        <h3 className="text-[15vw] leading-[0.75] tracking-tighter text-black opacity-5 select-none">
                            LET'S<br />TALK
                        </h3>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2">
                            <h3 className="text-[15vw] leading-[0.75] tracking-tighter text-black mix-blend-multiply opacity-20">
                                LET'S<br />TALK
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 text-3xl md:text-5xl lg:text-6xl leading-tight justify-center">
                        <Link href="mailto:hello@hkj.studio" className="group flex items-center gap-6 transition-all">
                            <span className="opacity-40 group-hover:opacity-100 group-hover:italic transition-all duration-700">hello@hkj.studio</span>
                            <div className="w-0 group-hover:w-24 h-[1px] bg-black opacity-20 transition-all duration-700" />
                        </Link>
                        <Link href="https://instagram.com" className="group flex items-center gap-6 transition-all">
                            <span className="opacity-40 group-hover:opacity-100 group-hover:italic transition-all duration-700">@hkj.studio</span>
                            <div className="w-0 group-hover:w-24 h-[1px] bg-black opacity-20 transition-all duration-700" />
                        </Link>
                        <Link href="https://linkedin.com" className="group flex items-center gap-6 transition-all">
                            <span className="opacity-40 group-hover:opacity-100 group-hover:italic transition-all duration-700">LinkedIn</span>
                            <div className="w-0 group-hover:w-24 h-[1px] bg-black opacity-20 transition-all duration-700" />
                        </Link>
                    </div>
                </div>

                {/* BOTTOM: LEGALS */}
                <div className="flex flex-col md:flex-row justify-between items-end mt-48 gap-8 border-t border-black/5 pt-12">
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-20">
                        SEOUL [KR] — LONDON [UK] — NEW YORK [US]
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-20 text-right leading-loose">
                        © 2026 HKJ STUDIO. ALL RIGHTS RESERVED.<br />
                        DESIGNED & BUILT BY HKJ.
                    </div>
                </div>
            </div>
        </footer>
    );
}
