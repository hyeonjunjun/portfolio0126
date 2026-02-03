export interface Project {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    role: string;
    credits: string;
    location: string;
    description: string;
    services: string[];
    media: string;
    thumbnails: string[];
}

export const PROJECTS: Project[] = [
    {
        id: "01",
        title: "SIFT",
        subtitle: "Curating digital noise for the next generation.",
        category: "Mobile Product",
        year: "2026",
        role: "Design Lead",
        credits: "Ryan Jun",
        location: "NYC - US",
        description: "SIFT is a discovery platform for curated digital content, designed to filter out the noise and focus on high-signal inspiration.",
        services: ["App Design", "Branding", "Motion", "Research"],
        media: "/images/sift-v2.jpg",
        thumbnails: [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&auto=format&fit=crop"
        ]
    },
    {
        id: "02",
        title: "DRIFT",
        subtitle: "A physics-based design language for spatial computing.",
        category: "Design System",
        year: "2026",
        role: "Creative Director",
        credits: "HKJ Studio",
        location: "NYC - US",
        description: "Antigravity is a robust design system built on the principles of weight, inertia, and fluid motion, specifically tailored for immersive interfaces.",
        services: ["System Design", "WebGL", "Documentation", "UI/UX"],
        media: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=200&auto=format&fit=crop"
        ]
    },
    {
        id: "03",
        title: "VerbAItim",
        subtitle: "Reimagining light as a structural element in digital space.",
        category: "Web Platform",
        year: "2026",
        role: "Interaction Designer",
        credits: "NYEdTech Team",
        location: "New York - US",
        description: "Luma explores the intersection of volumetric lighting and web-based navigation, creating an ethereal experience for luxury brands.",
        services: ["Art Direction", "Web Design", "Shaders", "Frontend"],
        media: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2576&auto=format&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&auto=format&fit=crop"
        ]
    },
    {
        id: "04",
        title: "STUDIO MESSA",
        subtitle: "A discovery platform for experiential projects.",
        category: "Visual Identity",
        year: "2024",
        role: "AD & Designer",
        credits: "Ilja Van Eck",
        location: "Sydney - AU",
        description: "Studio Messa is a curated collection of boutique hotels and products, guiding travellers towards intentional discovery.",
        services: ["Brand Identity", "Art Direction", "Web Design", "Webflow"],
        media: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        thumbnails: [
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=200&auto=format&fit=crop"
        ]
    }
];
