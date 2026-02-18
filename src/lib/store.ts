import { create } from "zustand";

interface StudioState {
    /** True once 3D assets / critical resources are loaded */
    isLoaded: boolean;
    setLoaded: (v: boolean) => void;

    /** Current scroll position from Lenis */
    scrollY: number;
    setScrollY: (y: number) => void;
}

export const useStudioStore = create<StudioState>((set) => ({
    isLoaded: false,
    setLoaded: (v) => set({ isLoaded: v }),

    scrollY: 0,
    setScrollY: (y) => set({ scrollY: y }),
}));
