import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Clock } from "@/components/site/Clock";
import { SocialIcons } from "@/components/site/SocialIcons";
import { NameHero } from "@/components/site/NameHero";
import { SkillOrbit } from "@/components/site/SkillOrbit";
import { SkillWave } from "@/components/site/SkillWave";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const featuredProjects = projects.slice(0, 3);
  const featuredPosts = posts.slice(0, 2);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Top bar */}
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="text-lg">👋</span>
          <span className="text-sm text-muted-foreground">Hello!</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-5"
        >
          <Clock />
          <span className="hidden h-4 w-px bg-border sm:block" />
          <SocialIcons />
        </motion.div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <SkillWave />
        <SkillOrbit />
        <NameHero />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="relative z-10 mt-10 max-w-md text-center text-sm sm:text-base text-muted-foreground"
        >
          software engineer building thoughtful products with{" "}
          <span className="text-ivory">code</span>,{" "}
          <span className="text-ivory">data</span> &{" "}
          <span className="text-ivory">AI</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-28 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60"
        >
          <span>scroll</span>
          <ArrowDown className="h-3 w-3 animate-bounce" />
        </motion.div>
      </section>

      {/* About */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-8 sm:p-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            About
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl leading-tight">
            I'm a software engineer <span className="italic text-gradient">building thoughtful products</span> with code, data and AI.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            I care about the entire journey — understanding users, designing experiences,
            writing clean code, and building systems that turn ideas into products people
            actually want to use.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Ship", v: "end-to-end" },
              { k: "Stack", v: "TS · Python" },
              { k: "AI", v: "RAG · LLMs" },
              { k: "Data", v: "Postgres · pgvector" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-border bg-ivory/[0.02] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">{s.k}</p>
                <p className="mt-1 text-sm text-ivory/90">{s.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured projects */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected work</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl leading-tight">Things I've built.</h2>
          </div>
          <Link to="/projects" className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-ivory">
            All projects <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {featuredProjects.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group relative overflow-hidden rounded-3xl glass p-6 transition-transform hover:-translate-y-1"
            >
              <div className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-60 transition-opacity group-hover:opacity-100`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">{p.status}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ivory" />
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-tight">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured writing */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-40 pt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">From the workshop</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl leading-tight">Recent writing.</h2>
          </div>
          <Link to="/writing" className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-ivory">
            All writing <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredPosts.map((a) => (
            <Link
              key={a.slug}
              to="/writing/$slug"
              params={{ slug: a.slug }}
              className="group glass overflow-hidden rounded-3xl transition-transform hover:-translate-y-1"
            >
              <div className={`relative h-32 w-full bg-gradient-to-br ${a.cover} overflow-hidden`}>
                <div className="absolute inset-0 opacity-40 mix-blend-overlay grid-bg" />
                <div className="absolute right-4 top-4 rounded-full bg-background/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-ivory/80 backdrop-blur">
                  {a.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{a.date}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span>{a.readingTime}</span>
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug tracking-tight transition-colors group-hover:text-gradient">
                  {a.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
