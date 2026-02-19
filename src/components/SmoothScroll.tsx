"use client";

import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.07, // Heavy, luxurious damping (per Master Config)
                duration: 1.2,
                smoothWheel: true,
            }}
        >
            <>{children}</>
        </ReactLenis>
    );
}
