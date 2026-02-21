"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface SmoothScrollProps {
    children: React.ReactNode;
}

function ScrollReset() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    return null;
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
            <ScrollReset />
            {children}
        </ReactLenis>
    );
}
