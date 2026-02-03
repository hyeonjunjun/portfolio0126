"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section className="w-full bg-[#0C0A0A]/80 backdrop-blur-lg border-b border-amber-400/10">
            <div className="max-w-[1920px] mx-auto border-x border-amber-400/10 grid grid-cols-1 md:grid-cols-12 min-h-[50vh]">

                {/* LEFT: CTA */}
                <div className="col-span-12 md:col-span-6 p-8 md:p-12 border-b md:border-b-0 border-r border-amber-400/10 flex flex-col justify-between">
                    <div>
                        <span className="font-mono text-[10px] text-[#A8A29E] uppercase tracking-widest block mb-4">
                            (Communication)
                        </span>
                        <div className="overflow-hidden">
                            <motion.h2
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                className="text-4xl md:text-7xl font-serif text-[#FEF3C7] leading-none group"
                            >
                                Start a <br /><span className="group-hover:italic transition-all duration-300 inline-block">Dialogue.</span>
                            </motion.h2>
                        </div>
                    </div>
                    <div className="mt-12 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#FDB9C8] animate-pulse inline-block mr-3" />
                        <span className="font-mono text-[10px] text-[#A8A29E] uppercase tracking-widest">
                            Available for 2026 Engagement
                        </span>
                    </div>
                </div>

                {/* RIGHT: LINKS */}
                <div className="col-span-12 md:col-span-6 grid grid-rows-3 text-[#FEF3C7]">
                    {/* EMAIL */}
                    <a href="mailto:hello@hyeonjun.com" className="row-span-1 border-b border-amber-400/10 p-8 flex items-center justify-between hover:bg-white/5 transition-colors group">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#A8A29E] group-hover:text-[#FDB9C8]">Email</span>
                        <span className="font-serif italic text-2xl md:text-3xl">hello@hyeonjun.com</span>
                    </a>

                    {/* SOCIALS */}
                    <div className="row-span-2 p-8 grid grid-cols-2 gap-8">
                        <a href="#" className="font-mono text-[10px] uppercase tracking-widest hover:text-[#FDB9C8] text-[#A8A29E] transition-colors">
                            (Instagram) ↗
                        </a>
                        <a href="#" className="font-mono text-[10px] uppercase tracking-widest hover:text-[#FDB9C8] text-[#A8A29E] transition-colors">
                            (LinkedIn) ↗
                        </a>
                        <a href="#" className="font-mono text-[10px] uppercase tracking-widest hover:text-[#FDB9C8] text-[#A8A29E] transition-colors">
                            (Twitter) ↗
                        </a>
                        <a href="#" className="font-mono text-[10px] uppercase tracking-widest hover:text-[#FDB9C8] text-[#A8A29E] transition-colors">
                            (Github) ↗
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
