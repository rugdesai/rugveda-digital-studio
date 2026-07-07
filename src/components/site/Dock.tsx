import { Link, useRouterState } from "@tanstack/react-router";
import { Home, FolderKanban, PenLine, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useLetsTalk } from "./LetsTalkModal";

const links = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/projects", label: "Projects", Icon: FolderKanban },
  { to: "/writing", label: "Writing", Icon: PenLine },
] as const;

export function Dock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { open } = useLetsTalk();

  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="glass flex items-center gap-1 rounded-full px-2 py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
        {links.map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className="group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-ivory"
            >
              {active && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-full bg-ivory/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative hidden sm:inline">{label}</span>
            </Link>
          );
        })}
        <span className="mx-1 h-6 w-px bg-border" />
        <button
          onClick={open}
          className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          <span className="absolute inset-0 rounded-full bg-[image:var(--gradient-brand)] animate-gradient" />
          <MessageCircle className="relative h-4 w-4 text-[#0b0b0f]" />
          <span className="relative font-medium text-[#0b0b0f]">Let's Talk</span>
        </button>
      </div>
    </motion.nav>
  );
}
