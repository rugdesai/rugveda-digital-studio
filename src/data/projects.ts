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
    "An AI-powered developer analytics platform that transforms GitHub profiles into comprehensive developer insights, scores, and repository analytics.",

  status: "Live",

  problem:
    "GitHub profiles expose large amounts of repository and contribution data, but developers and recruiters often lack meaningful insights into coding patterns, strengths, and overall engineering impact.",

  solution:
    "DevPlus integrates with the GitHub API to analyze repositories, commits, languages, stars, forks, and contribution patterns, using AI to generate developer scores, strengths, weaknesses, personalized recommendations, and interactive analytics.",

  role: "Full-stack Engineer + AI",

  techStack: [
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Prisma",
    "GitHub API",
    "Gemini AI",
    "Recharts",
    "Chrome Extension"
  ],

  features: [
    "GitHub profile and repository analytics",
    "AI-generated developer insights",
    "Developer scoring algorithm",
    "Strengths and weaknesses analysis",
    "Personalized improvement recommendations",
    "Interactive analytics dashboard",
    "Language and repository visualizations",
    "Chrome extension integration"
  ],

  productDecisions: [
    "Focused on actionable developer insights instead of overwhelming users with raw GitHub metrics.",
    "Combined deterministic analytics with AI-generated feedback for more personalized evaluations.",
    "Designed the extension to integrate directly into GitHub profiles for a seamless user experience.",
  ],

  engineeringHighlights: [
    "Integrated GitHub REST APIs to aggregate repository metadata, contribution statistics, and developer activity.",
    "Designed a modular Express.js backend with Prisma ORM and PostgreSQL for scalable data storage and caching.",
    "Implemented an AI pipeline using Gemini to generate developer scores, strengths, weaknesses, and personalized recommendations.",
    "Built analytics visualizations with Recharts for languages, repositories, stars, and contribution metrics.",
    "Developed a Chrome extension that injects AI-powered analytics directly into GitHub profile pages.",
    "Implemented intelligent caching and fallback mechanisms to reduce API usage and improve reliability."
  ],

  liveUrl: "https://devplus-backend-85gu.onrender.com",

  githubUrl:
    "https://github.com/rugdesai/devplus",

  blogUrl: "",

  accent: "from-yellow/40 to-lettuce/20",
}
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
