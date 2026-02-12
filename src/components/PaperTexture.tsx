"use client";

export default function PaperTexture() {
    return (
        <div className="fixed inset-0 z-[-1] w-full h-full pointer-events-none bg-[#F2F0E9]">
            <svg className="w-full h-full opacity-40 mix-blend-multiply">
                <filter id="paper-roughness">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="5"
                        stitchTiles="stitch"
                        result="noise"
                    />
                    <feDiffuseLighting
                        in="noise"
                        lightingColor="#F2F0E9"
                        surfaceScale="2"
                        result="light"
                    >
                        <feDistantLight azimuth="45" elevation="60" />
                    </feDiffuseLighting>
                </filter>
                <rect width="100%" height="100%" filter="url(#paper-roughness)" />
            </svg>
        </div>
    );
}
