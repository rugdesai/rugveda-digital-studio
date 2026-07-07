import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { getProject, projects, type Project } from "@/data/projects";
import { ProjectLinks } from "./projects";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const p = getProject(params.slug);
    const title = p ? `${p.name} — Rugveda Desai` : "Project — Rugveda Desai";
    const description = p?.description ?? "Case study by Rugveda Desai.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }): { project: Project } => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  return (
    <main className="relative mx-auto max-w-4xl px-6 pb-40 pt-32 sm:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-ivory"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Things I've built
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <StatusPill status={project.status} />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {project.role}
          </span>
        </div>

        <h1 className="mt-4 font-display text-5xl sm:text-6xl tracking-tight leading-[0.95]">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <ProjectLinks project={project} />
        </div>
      </motion.div>

      <div className="mt-16 space-y-14">
        <Section title="Problem" tint="orange">
          <p className="text-ivory/90 leading-relaxed">{project.problem}</p>
        </Section>

        <Section title="Solution" tint="blue">
          <p className="text-ivory/90 leading-relaxed">{project.solution}</p>
        </Section>

        <Section title="Tech Stack" tint="yellow">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-blue/30 bg-blue/10 px-3.5 py-1.5 text-sm text-ivory/90"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Key Features" tint="lettuce">
          <ul className="space-y-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-ivory/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lettuce" />
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Product Decisions" tint="orange">
          <ul className="space-y-3">
            {project.productDecisions.map((f) => (
              <li key={f} className="flex gap-3 text-ivory/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Engineering Highlights" tint="blue">
          <ul className="space-y-3">
            {project.engineeringHighlights.map((f) => (
              <li key={f} className="flex gap-3 text-ivory/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--blue-glow)]" />
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Other projects */}
      <div className="mt-24 border-t border-border pt-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">More work</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects
            .filter((p) => p.slug !== project.slug)
            .map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="glass group rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl">{p.name}</span>
                  <StatusPill status={p.status} />
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  tint,
  children,
}: {
  title: string;
  tint: "blue" | "orange" | "yellow" | "lettuce";
  children: React.ReactNode;
}) {
  const tintClass: Record<string, string> = {
    blue: "text-[color:var(--blue-glow)]",
    orange: "text-[color:var(--orange)]",
    yellow: "text-[color:var(--yellow)]",
    lettuce: "text-[color:var(--lettuce)]",
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
    >
      <p className={`font-mono text-[10px] uppercase tracking-[0.3em] ${tintClass[tint]}`}>{title}</p>
      <div className="mt-3">{children}</div>
    </motion.section>
  );
}

function StatusPill({ status }: { status: Project["status"] }) {
  const colors: Record<Project["status"], string> = {
    Live: "bg-lettuce/15 text-lettuce border-lettuce/30",
    Building: "bg-yellow/15 text-yellow border-yellow/40",
    Research: "bg-blue/20 text-[color:var(--blue-glow)] border-blue/40",
  };
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest ${colors[status]}`}>
      {status}
    </span>
  );
}

function ProjectNotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-40 text-center">
      <h1 className="font-display text-5xl text-gradient">Project not found</h1>
      <p className="mt-4 text-muted-foreground">
        This one might still be an idea in a notebook.
      </p>
      <Link
        to="/projects"
        className="mt-8 inline-flex items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm hover:bg-ivory/10"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
      </Link>
    </main>
  );
}
