import { useId } from "react";

// Wavy flowing lines of skill words drifting across the hero background,
// inspired by itsvg.in — soft, ambient, non-competing with the name.

const LINES: { words: string; y: number; amp: number; dur: number; opacity: number }[] = [
  {
    words:
      "React — TypeScript — Python — AI — Product — UX — Design Systems — Framer Motion — Tailwind — Node.js — ",
    y: 30,
    amp: 30,
    dur: 55,
    opacity: 0.14,
  },
  {
    words:
      "Machine Learning — RAG — LLMs — PostgreSQL — Data Science — FastAPI — Vector DBs — Prompt Design — Notion — ",
    y: 50,
    amp: 40,
    dur: 70,
    opacity: 0.11,
  },
  {
    words:
      "Prototyping — Research — Systems Thinking — Storytelling — Craft — Motion — Details — Whitespace — Curiosity — ",
    y: 70,
    amp: 25,
    dur: 90,
    opacity: 0.09,
  },
];

export function SkillWave() {
  const gid = useId().replace(/:/g, "");

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1600 100"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 h-full w-full"
      >
        <defs>
          {LINES.map((l, i) => (
            <path
              key={i}
              id={`${gid}-p${i}`}
              d={`M -200 ${l.y} Q 200 ${l.y - l.amp} 600 ${l.y} T 1400 ${l.y} T 2200 ${l.y}`}
              fill="none"
            />
          ))}
        </defs>

        {LINES.map((l, i) => (
          <text
            key={i}
            fill="currentColor"
            className="text-ivory font-mono"
            style={{ opacity: l.opacity, fontSize: 3.2 }}
          >
            <textPath href={`#${gid}-p${i}`} startOffset="0%">
              {l.words.repeat(6)}
              <animate
                attributeName="startOffset"
                from="0%"
                to="-100%"
                dur={`${l.dur}s`}
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        ))}
      </svg>
    </div>
  );
}
