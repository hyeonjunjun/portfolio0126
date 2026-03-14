"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStudioStore } from "@/lib/store";
import { PROJECTS } from "@/constants/projects";
import { useTransitionStore } from "@/store/useTransitionStore";

export default function NowPlayingPanel() {
  const router = useRouter();
  const activeProject = useStudioStore((s) => s.activeProject);
  const isPanelOpen = useStudioStore((s) => s.isPanelOpen);
  const setIsPanelOpen = useStudioStore((s) => s.setIsPanelOpen);
  const startTransition = useTransitionStore((s) => s.start);

  const project = PROJECTS.find((p) => p.id === activeProject);
  const projectIndex = PROJECTS.findIndex((p) => p.id === activeProject);
  const num = projectIndex >= 0 ? String(projectIndex + 1).padStart(2, "0") : "00";

  const handleViewCaseStudy = (e: React.MouseEvent) => {
    if (!project) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    startTransition(`/work/${project.id}`, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setTimeout(() => router.push(`/work/${project.id}`), 100);
  };

  if (!isPanelOpen || !project) return null;

  // Desktop push (>= 1280): side panel
  // Tablet overlay (1024-1279): side panel with backdrop (handled in AppShell)
  // Tablet sheet (768-1023px): bottom sheet
  // Mobile (< 768px): never shown (rows navigate directly)

  return (
    <motion.aside
      initial={{ x: "100%", y: 0 }}
      animate={{ x: 0, y: 0 }}
      exit={{ x: "100%", y: 0 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="h-full overflow-y-auto hidden md:block
        max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:z-40
        max-lg:h-[60vh] max-lg:w-full max-lg:rounded-t-xl
        lg:relative lg:h-full lg:w-[380px]"
      style={{
        borderLeft: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg)",
      }}
    >
      {/* Close button */}
      <div
        className="sticky top-0 flex justify-end p-4"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <button
          onClick={() => setIsPanelOpen(false)}
          className="font-mono hover:text-[var(--color-accent)] transition-colors"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-secondary)",
          }}
        >
          &#x2715;
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-12"
        >
          {/* Number + Title */}
          <span
            className="font-mono block mb-2"
            style={{
              fontSize: "var(--text-micro)",
              letterSpacing: "0.1em",
              color: "var(--color-text-ghost)",
            }}
          >
            [{num}]
          </span>
          <h3
            className="font-sans font-medium uppercase mb-6"
            style={{
              fontSize: "var(--text-lg)",
              letterSpacing: "0.04em",
              color: "var(--color-text)",
            }}
          >
            {project.title}
          </h3>

          <div className="hairline mb-6" />

          {/* Spec table */}
          {[
            { label: "CLIENT", value: project.client },
            { label: "ROLE", value: project.role },
            { label: "SECTOR", value: project.sector },
            { label: "YEAR", value: project.year },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2">
              <span
                className="font-mono"
                style={{
                  fontSize: "var(--text-micro)",
                  letterSpacing: "0.1em",
                  color: "var(--color-text-ghost)",
                }}
              >
                {label}
              </span>
              <span
                className="font-sans"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {value}
              </span>
            </div>
          ))}

          <div className="hairline my-6" />

          {/* Pitch */}
          <p
            className="font-serif italic mb-6"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: 1.6,
              color: "var(--color-text-secondary)",
            }}
          >
            &ldquo;{project.pitch}&rdquo;
          </p>

          <div className="hairline mb-6" />

          {/* Stack */}
          <span
            className="micro block mb-3"
            style={{ color: "var(--color-text-ghost)" }}
          >
            stack
          </span>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.schematic.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono"
                style={{
                  fontSize: "var(--text-micro)",
                  color: "var(--color-text-secondary)",
                  padding: "2px 8px",
                  border: "1px solid var(--color-border)",
                  borderRadius: 2,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="hairline mb-6" />

          {/* Tags */}
          <span
            className="micro block mb-3"
            style={{ color: "var(--color-text-ghost)" }}
          >
            tags
          </span>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans"
                style={{
                  fontSize: "var(--text-micro)",
                  color: "var(--color-text-ghost)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="hairline mb-6" />

          {/* View Case Study CTA */}
          <button
            onClick={handleViewCaseStudy}
            data-cursor="project"
            className="font-mono uppercase tracking-[0.15em] hover:text-[var(--color-accent)] transition-colors"
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text)",
            }}
          >
            view case study →
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.aside>
  );
}
