import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { posts, type PostCategory } from "@/data/posts";

export const Route = createFileRoute("/writing/")({
  head: () => ({
    meta: [
      { title: "Writing — Rugveda Desai" },
      {
        name: "description",
        content: "Build logs, product breakdowns and AI notes by Rugveda Desai.",
      },
      { property: "og:title", content: "Writing — Rugveda Desai" },
      {
        property: "og:description",
        content: "Notes on building thoughtful products with code, data & AI.",
      },
    ],
  }),
  component: WritingPage,
});

type Filter = "All" | PostCategory;

function WritingPage() {
  const [cat, setCat] = useState<Filter>("All");

  const categories = useMemo<Filter[]>(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [],
  );

  const filtered = cat === "All" ? posts : posts.filter((a) => a.category === cat);

  return (
    <main className="relative mx-auto max-w-5xl px-6 pb-40 pt-32 sm:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Writing
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">
          Notes from the<br />
          <span className="italic text-gradient">workshop</span>.
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Build logs, product breakdowns, and small essays on AI — mostly for me,
          occasionally useful for you.
        </p>
        <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">
          Add markdown files in <span className="text-ivory/80">src/content/blog/</span> — they appear here automatically.
        </p>
      </motion.div>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              cat === c
                ? "bg-ivory text-[#0b0b0f]"
                : "glass text-muted-foreground hover:text-ivory"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {filtered.map((a, i) => (
          <motion.div
            key={a.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link
              to="/writing/$slug"
              params={{ slug: a.slug }}
              className="group glass block overflow-hidden rounded-3xl transition-transform hover:-translate-y-1"
            >
              <div className={`relative h-40 w-full bg-gradient-to-br ${a.cover} overflow-hidden`}>
                {a.coverImage ? (
                  <img src={a.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay grid-bg" />
                )}
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
                <h2 className="mt-3 font-display text-2xl leading-snug tracking-tight transition-colors group-hover:text-gradient">
                  {a.title}
                </h2>
                {a.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                )}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-lettuce/30 bg-lettuce/10 px-2 py-0.5 text-[10px] text-lettuce"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ivory" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
