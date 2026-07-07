import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Mail, X, Check } from "lucide-react";

const EMAIL = "desairugveda@gmail.com";

type Ctx = { open: () => void; close: () => void };
const LetsTalkCtx = createContext<Ctx>({ open: () => {}, close: () => {} });

export function useLetsTalk() {
  return useContext(LetsTalkCtx);
}

export function LetsTalkProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <LetsTalkCtx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/70 backdrop-blur-md"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Let's Talk"
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative w-full max-w-lg rounded-3xl p-8 sm:p-10 shadow-[var(--shadow-glow)]"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-ivory/10 hover:text-ivory"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-ivory/5 px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-rose" /> Available for new work
              </div>

              <h2 className="font-display text-4xl sm:text-5xl tracking-tight">
                Let's <span className="italic text-gradient">talk</span>.
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Have an idea, opportunity, collaboration or just want to chat about tech &
                products? I'd love to hear from you.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-medium text-[#0b0b0f] transition-transform hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 bg-[image:var(--gradient-brand)] animate-gradient" />
                  <Mail className="relative h-4 w-4" />
                  <span className="relative">Send me an email</span>
                </a>
                <button
                  onClick={copy}
                  className="glass inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ivory/10"
                >
                  {copied ? <Check className="h-4 w-4 text-champagne" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy my email"}
                </button>
              </div>

              <p className="mt-6 font-mono text-xs text-muted-foreground">{EMAIL}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LetsTalkCtx.Provider>
  );
}
