import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Github, ExternalLink, FileText } from "lucide-react";
import { projects, type Project } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Things I've Built — Rugveda Desai" },
      {
        name: "description",
        content:
          "Engineering + product case studies by Rugveda Desai — CollabNote, PrepPal, DevPlus and more.",
      },
      { property: "og:title", content: "Things I've Built — Rugveda Desai" },
      {
        property: "og:description",
        content: "Engineering + product case studies at the intersection of code, data and AI.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="relative mx-auto max-w-5xl px-6 pb-40 pt-32 sm:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Selected work
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">
          Things I've<br />
          <span className="italic text-gradient">built</span>.
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Products I've designed, engineered and shipped — usually with a small team,
          always with too many ideas in the margins.
        </p>
      </motion.div>

      <div className="mt-16 space-y-8">
        {projects.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-3xl glass p-8 sm:p-10 transition-transform hover:-translate-y-1"
          >
            <div
              className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-60 transition-opacity group-hover:opacity-100`}
            />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="font-display text-3xl sm:text-4xl tracking-tight transition-colors hover:text-gradient"
                  >
                    {p.name}
                  </Link>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-2 text-muted-foreground">{p.description}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Problem">{p.problem}</Field>
                  <Field label="My role">{p.role}</Field>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.techStack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-blue/30 bg-blue/10 px-3 py-1 text-xs text-ivory/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 lg:items-end">
                <div className="flex flex-wrap gap-2 lg:justify-end">
  <ProjectLinks project={p} compact />
</div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ivory/90">{children}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors: Record<Project["status"], string> = {
    Live: "bg-lettuce/15 text-lettuce border-lettuce/30",
    Building: "bg-yellow/15 text-yellow border-yellow/40",
    Research: "bg-blue/20 text-[color:var(--blue-glow)] border-blue/40",
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export function ProjectLinks({ project, compact }: { project: Project; compact?: boolean }) {
  const base = compact
    ? "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ivory/[0.03] px-3.5 py-2 text-xs font-medium text-ivory/90 transition-colors hover:bg-ivory/10"
    : "inline-flex items-center gap-2 rounded-full border border-white/10 bg-ivory/[0.04] px-4 py-2.5 text-sm font-medium text-ivory/90 transition-colors hover:bg-ivory/10";
  return (
    <>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className={base}>
          <ExternalLink className="h-3.5 w-3.5 text-[color:var(--orange)]" />
          Live Demo
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className={base}>
          <Github className="h-3.5 w-3.5 text-[color:var(--blue-glow)]" />
          GitHub
        </a>
      )}
      {project.blogUrl && (
        <a href={project.blogUrl} className={base}>
          <FileText className="h-3.5 w-3.5 text-[color:var(--yellow)]" />
          Build Story
        </a>
      )}
    </>
  );
}
