"use client";

import Link from "next/link";

export default function LandingFooter() {
    return (
        <footer className="w-full bg-[#0C0A0A] text-white pt-24 pb-12 px-8 border-t border-white/10 font-serif">
            <div className="max-w-[1920px] mx-auto flex flex-col justify-between min-h-[50vh]">

                {/* TOP: BIG LINKS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-[10vw] leading-[0.8] tracking-tighter mix-blend-overlay opacity-50 mb-8">
                            LET'S<br />TALK
                        </h3>
                    </div>
                    <div className="flex flex-col gap-4 text-2xl md:text-3xl leading-snug">
                        <Link href="mailto:hello@hkj.studio" className="hover:italic hover:text-white/70 transition-all">hello@hkj.studio</Link>
                        <Link href="https://instagram.com" className="hover:italic hover:text-white/70 transition-all">@hkj.studio</Link>
                        <Link href="https://linkedin.com" className="hover:italic hover:text-white/70 transition-all">LinkedIn</Link>
                    </div>
                </div>

                {/* BOTTOM: LEGALS */}
                <div className="flex flex-col md:flex-row justify-between items-end mt-24 gap-8">
                    <div className="font-mono text-[10px] tracking-widest uppercase opacity-40">
                        SEOUL [KR] — LONDON [UK] — NEW YORK [US]
                    </div>
                    <div className="font-mono text-[10px] tracking-widest uppercase opacity-40 text-right">
                        © 2026 HKJ STUDIO. ALL RIGHTS RESERVED.<br />
                        DESIGNED & BUILT BY HKJ.
                    </div>
                </div>
            </div>
        </footer>
    );
}
