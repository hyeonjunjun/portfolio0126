"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { PROJECTS, Project } from "@/constants/projects";
import ScrollStage from "@/components/case-study/ScrollStage";
import PageTransition from "@/components/PageTransition";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const found = PROJECTS.find((p) => p.id === resolvedParams.id);
        if (found) {
            setProject(found);
        }
    }, [resolvedParams.id]);

    if (!project) return null;

    return (
        <PageTransition>
            <main className="min-h-screen relative">
                <ScrollStage project={project} />
            </main>
        </PageTransition>
    );
}
