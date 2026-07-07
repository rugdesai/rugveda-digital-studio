import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, posts, type Post } from "@/data/posts";

export const Route = createFileRoute("/writing/$slug")({
  head: ({ params }) => {
    const p = getPost(params.slug);
    const title = p ? `${p.title} — Rugveda Desai` : "Article — Rugveda Desai";
    const description = p?.excerpt ?? "Writing by Rugveda Desai.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  loader: ({ params }): { post: Post } => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: ArticleNotFound,
  component: Article,
});

function Article() {
  const { post } = Route.useLoaderData() as { post: Post };
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="relative mx-auto max-w-3xl px-6 pb-40 pt-32 sm:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/writing"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-ivory"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All writing
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span className="rounded-full border border-blue/30 bg-blue/10 px-2.5 py-0.5 font-medium uppercase tracking-widest text-[color:var(--blue-glow)]">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-5 font-display text-4xl sm:text-6xl tracking-tight leading-[1.02]">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
        )}

        <div className={`mt-10 h-56 w-full rounded-3xl bg-gradient-to-br ${post.cover} border border-white/5 relative overflow-hidden`}>
          {post.coverImage ? (
            <img src={post.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 opacity-40 mix-blend-overlay grid-bg" />
          )}
        </div>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="prose-article mt-12"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </motion.article>

      <div className="mt-8 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-lettuce/30 bg-lettuce/10 px-2.5 py-1 text-[11px] text-lettuce"
          >
            #{t}
          </span>
        ))}
      </div>

      {others.length > 0 && (
        <div className="mt-20 border-t border-border pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Keep reading
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((a) => (
              <Link
                key={a.slug}
                to="/writing/$slug"
                params={{ slug: a.slug }}
                className="glass group rounded-2xl p-5 transition-transform hover:-translate-y-1"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                  {a.category}
                </p>
                <p className="mt-2 font-display text-lg leading-snug transition-colors group-hover:text-gradient">
                  {a.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function ArticleNotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-40 text-center">
      <h1 className="font-display text-5xl text-gradient">Article not found</h1>
      <p className="mt-4 text-muted-foreground">
        This one might still be a draft in a notebook.
      </p>
      <Link
        to="/writing"
        className="mt-8 inline-flex items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm hover:bg-ivory/10"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to writing
      </Link>
    </main>
  );
}
