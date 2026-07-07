// ─────────────────────────────────────────────────────────────
// WRITING — posts are now sourced from markdown files.
//
// To add a new post: create src/content/blog/<slug>.md
// with frontmatter (title, description, date, category, readTime,
// tags, coverImage, cover). It will appear on /writing automatically
// and get its own page at /writing/<slug>.
// ─────────────────────────────────────────────────────────────

export type PostCategory = "Build Logs" | "Product Breakdowns" | "AI Notes";

export type Post = {
  slug: string;
  title: string;
  category: PostCategory;
  date: string;
  readingTime: string;
  tags: string[];
  /** Tailwind gradient for the cover block. */
  cover: string;
  /** Optional cover image URL — takes precedence over gradient when set. */
  coverImage?: string;
  /** Short summary shown on the writing index. */
  excerpt?: string;
  /** Markdown body rendered on the article page. */
  body: string;
};

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  readTime?: string;
  readingTime?: string;
  tags?: string[];
  coverImage?: string;
  cover?: string;
};

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const [, fm, body] = match;
  const data: Record<string, unknown> = {};
  const lines = fm.split(/\r?\n/);
  let key: string | null = null;
  let buf = "";
  const commit = () => {
    if (!key) return;
    const v = buf.trim();
    if (v.startsWith("[")) {
      try {
        data[key] = JSON.parse(v);
      } catch {
        data[key] = [];
      }
    } else if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      data[key] = v.slice(1, -1);
    } else {
      data[key] = v;
    }
    key = null;
    buf = "";
  };
  for (const line of lines) {
    const isIndented = /^[ \t]/.test(line);
    const kv = line.match(/^([A-Za-z_][\w]*)\s*:\s*(.*)$/);
    if (kv && !isIndented) {
      commit();
      key = kv[1];
      buf = kv[2];
    } else if (key) {
      const trimmed = line.trim();
      if (trimmed) buf += (buf ? " " : "") + trimmed;
    }
  }
  commit();
  return { data: data as Frontmatter, body: body.trim() };
}

const DEFAULT_COVER = "from-blue/60 via-orange/30 to-transparent";
const VALID_CATEGORIES: PostCategory[] = [
  "Build Logs",
  "Product Breakdowns",
  "AI Notes",
];

const modules = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function loadPosts(): Post[] {
  const list: Post[] = Object.entries(modules).map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const category = (
      VALID_CATEGORIES.includes(data.category as PostCategory)
        ? data.category
        : "Build Logs"
    ) as PostCategory;
    return {
      slug: slugFromPath(path),
      title: data.title ?? "Untitled",
      category,
      date: data.date ?? "",
      readingTime: data.readTime ?? data.readingTime ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover || DEFAULT_COVER,
      coverImage: data.coverImage || undefined,
      excerpt: data.description,
      body,
    };
  });

  // Sort newest first when dates parse; otherwise leave stable.
  list.sort((a, b) => {
    const ta = Date.parse(a.date);
    const tb = Date.parse(b.date);
    if (isNaN(ta) || isNaN(tb)) return 0;
    return tb - ta;
  });

  return list;
}

export const posts: Post[] = loadPosts();

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
