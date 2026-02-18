"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

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
