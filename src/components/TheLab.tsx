"use client";

import { motion } from "framer-motion";
import InkButton from "./InkButton";

const experiments = [
    { id: "EXP_01", name: "Fluid Simulation", date: "24.01", stack: "WebGL" },
    { id: "EXP_02", name: "Text Distortion", date: "24.02", stack: "Three.js" },
    { id: "EXP_03", name: "Grain Shaders", date: "23.11", stack: "GLSL" },
    { id: "EXP_04", name: "Physics Nav", date: "23.10", stack: "Matter.js" },
    { id: "EXP_05", name: "Audio Viz", date: "23.09", stack: "Web Audio" },
    { id: "EXP_06", name: "Cursor Mag", date: "23.08", stack: "Framer" },
    { id: "EXP_07", name: "Image Reveal", date: "23.07", stack: "Canvas" },
    { id: "EXP_08", name: "Type Glyphs", date: "23.06", stack: "OpenType" },
    { id: "EXP_09", name: "Neural Style", date: "23.05", stack: "TensorFlow" },
    { id: "EXP_10", name: "Gen Art", date: "23.04", stack: "p5.js" },
];

export default function TheLab() {
    return (
        <section id="lab" className="w-full py-24 bg-[#E5E5E5] flex justify-center items-center relative overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
            />

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-md bg-white shadow-2xl drop-shadow-2xl text-[#1A1A18] font-mono text-sm"
                style={{
                    clipPath: "polygon(0% 0%, 5% 2%, 10% 0%, 15% 2%, 20% 0%, 25% 2%, 30% 0%, 35% 2%, 40% 0%, 45% 2%, 50% 0%, 55% 2%, 60% 0%, 65% 2%, 70% 0%, 75% 2%, 80% 0%, 85% 2%, 90% 0%, 95% 2%, 100% 0%, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0% 100%)",
                    padding: "3rem 1.5rem", // Extra padding for the jagged edges
                }}
            >
                {/* Receipt Header */}
                <div className="text-center mb-8 border-b border-dashed border-gray-300 pb-4">
                    <div className="text-2xl font-bold mb-2">THE LAB</div>
                    <div className="text-xs text-gray-500">RYAN JUN / R&D DIVISION</div>
                    <div className="text-xs text-gray-500">EST. 2026</div>
                    <div className="mt-4 text-xs uppercase tracking-widest">
                        ********************************
                    </div>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-3 mb-8">
                    <div className="flex justify-between text-xs text-gray-400 border-b border-gray-200 pb-1 mb-2">
                        <span>ITEM</span>
                        <span>DATE</span>
                    </div>
                    {experiments.map((exp, i) => (
                        <div key={exp.id} className="flex justify-between items-baseline group cursor-pointer hover:bg-gray-100 p-1 rounded transition-colors">
                            <div className="flex flex-col">
                                <span className="font-bold uppercase group-hover:text-[#D94E1E] transition-colors">{exp.name}</span>
                                <span className="text-[10px] text-gray-400">{exp.stack}</span>
                            </div>
                            <span className="text-gray-500">{exp.date}</span>
                        </div>
                    ))}
                </div>

                {/* Total / Footer */}
                <div className="border-t border-dashed border-gray-300 pt-4 mb-8">
                    <div className="flex justify-between font-bold text-lg">
                        <span>TOTAL EXP.</span>
                        <span>{experiments.length}</span>
                    </div>
                </div>

                {/* Barcode / Signature */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjUwIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSI1MCIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] opacity-60" />
                    <div className="font-hand text-xl rotate-[-5deg] text-gray-600 opacity-80">
                        Ryan Jun
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex justify-center">
                    <InkButton className="text-sm px-6 py-2">
                        VIEW ALL
                    </InkButton>
                </div>

            </motion.div>
        </section>
    );
}
