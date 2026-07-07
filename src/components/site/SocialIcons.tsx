import { Github, Linkedin, Mail, FileText } from "lucide-react";
import type { ComponentType } from "react";

// Spotify icon (lucide doesn't ship one)
const Spotify: ComponentType<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.16a.75.75 0 1 1-.33-1.46c4.56-1.04 8.48-.59 11.64 1.34.36.22.47.69.26 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.8c4.37-1.32 9.79-.68 13.5 1.6.44.27.58.85.31 1.29zm.13-3.41C15.24 8.4 8.5 8.17 4.87 9.27a1.12 1.12 0 1 1-.66-2.15c4.17-1.27 11.62-1 15.99 1.6a1.12 1.12 0 1 1-1.16 1.94z" />
  </svg>
);

type Item = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
  /** hover tint — from the San Sebastian palette */
  tint: string;
};

const items: Item[] = [
  { label: "GitHub", href: "https://github.com/rugdesai", Icon: Github, tint: "rgba(74,92,196,0.55)" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rugvedadesai/", Icon: Linkedin, tint: "rgba(74,92,196,0.55)" },
  { label: "Email", href: "mailto:desairugveda@gmail.com", Icon: Mail, tint: "rgba(238,115,2,0.55)" },
  { label: "Resume", href: "/resume.pdf", Icon: FileText, tint: "rgba(229,163,0,0.55)" },
  { label: "Spotify", href: "https://open.spotify.com/user/31wuia5ocgnz2q2psciwmbyuvpae", Icon: Spotify, tint: "rgba(166,175,50,0.55)" },
];

export function SocialIcons() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {items.map(({ label, href, Icon, tint }) => {
        const isExternal = href.startsWith("http");
        const isPdf = href.endsWith(".pdf");
        return (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          target={isExternal || isPdf ? "_blank" : undefined}
          rel={isExternal || isPdf ? "noopener noreferrer" : undefined}
          className="group relative grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-all duration-300 hover:text-ivory hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory/60"
          style={{ ["--tint" as string]: tint }}
        >
          <span className="absolute inset-0 rounded-full bg-glass opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100" />
          <span
            className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "var(--tint)" }}
          />
          <span className="absolute inset-0 rounded-full border border-transparent transition-colors duration-300 group-hover:border-white/15" />
          <Icon className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
        );
      })}
    </div>
  );
}
