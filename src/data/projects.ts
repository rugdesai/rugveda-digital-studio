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

    description:
      "A Notion-inspired collaborative editor with real-time synchronization, rich text editing, authentication, and cloud deployment.",

    status: "Live",

    problem:
      "Teams and individuals need lightweight collaborative spaces where ideas can be written, edited, and shared instantly without complex workspace setup.",

    solution:
      "Built a full-stack collaborative notes platform featuring a rich text editor, real-time document synchronization, secure authentication, image uploads, and persistent cloud storage.",

    role: "Full-stack Engineer",

    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Socket.IO",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Cloudinary",
    ],

    features: [
      "Real-time collaborative editing using Socket.IO",
      "Rich text editing with formatting, colors, links, and images",
      "JWT-based authentication and protected routes",
      "Automatic note saving with persistent storage",
      "Cloud image uploads through Cloudinary",
      "Collaborator invite and sharing system",
    ],

    productDecisions: [
      "Focused on a minimal writing experience inspired by modern workspace tools.",
      "Implemented automatic saving to reduce friction during editing.",
      "Separated ownership and collaboration models to support shared documents.",
    ],

    engineeringHighlights: [
      "Built WebSocket-based real-time synchronization with note-specific collaboration rooms.",
      "Designed relational database models using PostgreSQL and Prisma ORM.",
      "Implemented secure authentication using JWT and password hashing.",
      "Integrated a customizable Tiptap editor for rich document editing.",
      "Dockerized backend services and deployed the full-stack application using Vercel and Render.",
    ],

    liveUrl: "https://collabnote-seven.vercel.app",

    githubUrl:
      "https://github.com/rugdesai/collabnote",

    blogUrl:
      "/writing/building-collabnote",

    accent: "from-blue/40 to-orange/20",
  },
  {
  slug: "devplus",

  name: "DevPlus",

  description:
    "An AI-powered developer analytics platform that transforms GitHub activity into meaningful engineering insights.",

  status: "Building",

  problem:
    "Developers create valuable signals through commits, pull requests, and collaboration, but this activity is usually scattered across repositories and difficult to understand at a higher level.",

  solution:
    "DevPlus analyzes GitHub activity and converts raw development data into readable summaries, productivity insights, and project progress reports using AI.",

  role: "Full-stack Engineer + AI",

  techStack: [
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "GitHub API",
    "OpenAI API",
    "Recharts",
  ],

  features: [
    "GitHub repository activity analysis",
    "Commit and pull request insights",
    "AI-generated development summaries",
    "Developer contribution timeline",
    "Interactive analytics dashboard",
  ],

  productDecisions: [
    "Focused on insights instead of raw metrics to make developer activity easier to understand.",
    "Designed summaries to highlight progress, blockers, and important engineering changes.",
    "Prioritized a clean dashboard experience for quickly understanding project health.",
  ],

  engineeringHighlights: [
    "Integrated GitHub APIs to fetch and process repository activity.",
    "Built data pipelines to transform commits and pull requests into structured insights.",
    "Implemented AI-powered summaries over developer activity.",
    "Designed analytics dashboards using interactive visualizations.",
    "Created scalable backend models for storing repository and activity data.",
  ],

  liveUrl: "",

  githubUrl:
    "https://github.com/rugdesai/devplus",

  blogUrl: "",

  accent: "from-yellow/40 to-lettuce/20",
}
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
