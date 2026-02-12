"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import LandingHero from "../components/LandingHero";
import SelectedWork from "../components/SelectedWork"; // Was Projects.tsx or new file? used Projects.tsx content in previous step but named access generic. 
// Wait, I replaced Projects.tsx content with SelectedWork logic but the file is likely still Projects.tsx unless I renamed it?
// I replaced content of c:\Users\Ryan Jun\.gemini\antigravity\scratch\portfolio0126\src\components\Projects.tsx with `export default function SelectedWork()`.
// So I should import content from Projects.tsx but alias it or just use it. 
import TheLab from "../components/TheLab";
import About from "../components/About";
import LandingFooter from "../components/LandingFooter";
import ProjectDetail from "../components/ProjectDetail";
import { Project, PROJECTS } from "../constants/projects";
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Body Scroll Lock when Project Open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedProject]);

  return (
    <div className="relative w-full min-h-screen bg-[#F2F0E9] text-[#1A1A18] font-serif selection:bg-[#D94E1E] selection:text-white">

      <Header />

      <main className="relative z-10 w-full min-h-screen">

        {/* SECTION 1: HERO */}
        <LandingHero />

        {/* SECTION 2: WORK */}
        <SelectedWork onSelect={(id) => {
          const project = PROJECTS.find(p => p.id === id);
          if (project) {
            setSelectedProject(project);
          }
        }} />

        {/* SECTION 3: THE LAB */}
        <TheLab />

        {/* SECTION 4: ABOUT */}
        <About />

        {/* SECTION 5: FOOTER */}
        <LandingFooter />

      </main>

      {/* CASE STUDY OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
