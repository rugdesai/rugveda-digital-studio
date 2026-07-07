import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function BackgroundFX() {
  const [particles, setParticles] = useState<
    { id: number; left: string; top: string; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        size: Math.random() * 2 + 1,
      })),
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* Blurred gradient blobs — market palette, used sparingly */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue/25 blur-[120px] animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-orange/15 blur-[130px] animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-yellow/10 blur-[110px] animate-float-slow" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-ivory/40"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 6 + p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,11,15,0.7)_100%)]" />
    </div>
  );
}
