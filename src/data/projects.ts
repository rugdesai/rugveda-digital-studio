// ─────────────────────────────────────────────────────────────
// PROJECTS — edit this file to add, remove or update projects.
// Every entry appears on /projects.
//
// - Set `blogUrl` to a route like "/writing/building-collabnote"
//   to enable the "Build Story" button. Leave empty to hide it.
// - Each project also renders on its own page: /projects/<slug>
// ─────────────────────────────────────────────────────────────

export type ProjectStatus = "Live" | "Building" | "Research";

export type Project = {
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  problem: string;
  solution: string;
  role: string;
  techStack: string[];
  features: string[];
  productDecisions: string[];
  engineeringHighlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  blogUrl?: string;
  /** Tailwind gradient classes for the accent glow on cards. */
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "collabnote",
    name: "CollabNote",
    description: "A real-time collaborative workspace, rebuilt from first principles.",
    status: "Live",
    problem:
      "Small teams need a shared brain — a workspace where notes, tasks and docs update live — without enterprise bloat or vendor lock-in.",
    solution:
      "A minimal Notion-style workspace with true real-time collaboration: multi-cursor editing, presence, offline-first sync, and a fast, keyboard-driven UI.",
    role: "Full-stack Engineer + Product",
    techStack: [
      "React", "TypeScript", "Node.js", "Socket.io", "PostgreSQL", "Prisma", "Redis", "Docker",
    ],
    features: [
      "Multi-user real-time editing with presence and cursors",
      "Offline-first sync with conflict-free merging",
      "Nested pages, blocks and drag-to-reorder",
      "Keyboard-first command palette",
      "Sharable read-only public links",
    ],
    productDecisions: [
      "Chose block-based editing over WYSIWYG for future extensibility (embeds, databases, AI blocks).",
      "Prioritised keyboard-first UX — every action reachable via ⌘K, no context switching.",
      "Public share links default to read-only to keep the trust model simple.",
    ],
    engineeringHighlights: [
      "CRDT-based document model on top of Yjs for conflict-free real-time editing.",
      "WebSocket layer with room-scoped presence, backed by Redis pub/sub for horizontal scaling.",
      "Postgres + Prisma with materialised snapshots so cold loads are one query, not N.",
      "Optimistic UI with a local queue that reconciles on reconnect — feels instant, survives flaky wifi.",
      "Dockerised dev + prod parity, one-command spin-up for contributors.",
    ],
    liveUrl: "https://github.com/rugdesai",
    githubUrl: "https://github.com/rugdesai/collabnote",
    blogUrl: "/writing/building-collabnote",
    accent: "from-blue/40 to-orange/20",
  },
  {
    slug: "preppal",
    name: "PrepPal",
    description: "An AI study companion that turns any syllabus into a learning path.",
    status: "Building",
    problem:
      "Students drown in materials but starve for structure. Existing AI tutors hallucinate, ignore your actual syllabus, and don't adapt as you learn.",
    solution:
      "PrepPal ingests your syllabus and source material, builds a personalised learning graph, and generates retrieval-grounded explanations, quizzes and spaced-repetition sessions.",
    role: "Founder · Full-stack + ML",
    techStack: [
      "React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "pgvector", "OpenAI", "LangChain",
    ],
    features: [
      "Upload PDFs, slides, notes — auto-chunked and embedded",
      "Retrieval-grounded Q&A with inline citations",
      "Adaptive quizzes that target your weak spots",
      "Spaced-repetition schedule per concept",
      "Progress dashboard by topic and confidence",
    ],
    productDecisions: [
      "Every AI answer must cite the source chunk — no citation, no answer.",
      "Learning graph is user-editable: students trust it more when they can prune it.",
      "Free tier caps tokens, not features — students shouldn't lose the product when broke.",
    ],
    engineeringHighlights: [
      "Hybrid retrieval (BM25 + dense vectors in pgvector) with a re-ranker for tight, on-topic context.",
      "Streaming LLM responses over Server-Sent Events for a snappy chat feel.",
      "Background worker pipeline for ingestion (parse → chunk → embed → index) with idempotent retries.",
      "Prompt + model versioning so every generated answer is reproducible for debugging.",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/rugdesai/preppal",
    blogUrl: "",
    accent: "from-orange/40 to-yellow/20",
  },
  {
    slug: "devplus",
    name: "DevPlus",
    description: "Developer analytics that read like a story, not a spreadsheet.",
    status: "Research",
    problem:
      "Engineering teams have data everywhere and insight nowhere. Leaders skim dashboards; contributors feel measured, not understood.",
    solution:
      "DevPlus pulls GitHub activity into a weekly narrative — what shipped, what stalled, what patterns are emerging — with AI summaries scoped to your team's actual work.",
    role: "Design Engineer + AI",
    techStack: [
      "React", "TypeScript", "GitHub API", "Node.js", "PostgreSQL", "OpenAI", "Recharts",
    ],
    features: [
      "Weekly team narrative auto-generated from PRs, reviews and issues",
      "Per-contributor patterns without individual leaderboards",
      "Drill-down from narrative to raw commits in one click",
      "Slack / email digests",
    ],
    productDecisions: [
      "No individual rankings. Narratives are team-scoped by design to avoid perverse incentives.",
      "Every AI summary links back to the underlying PRs — leaders must be able to verify.",
      "Metrics are qualitative first, quantitative second — the point is understanding, not scoring.",
    ],
    engineeringHighlights: [
      "Incremental GitHub sync with cursor-based pagination and delta storage.",
      "Event-driven ingestion pipeline that groups related activity into 'stories' before summarisation.",
      "LLM prompt scoped to a single team-week window to keep cost predictable and outputs faithful.",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/rugdesai",
    blogUrl: "",
    accent: "from-yellow/40 to-lettuce/20",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
