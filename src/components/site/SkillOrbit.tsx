import { motion } from "motion/react";

export function SkillOrbit() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2"
    >
      {/* Rings */}
      <div className="absolute inset-0 rounded-full border border-ivory/5" />
      <div className="absolute inset-[8%] rounded-full border border-ivory/[0.04]" />
      <div className="absolute inset-[18%] rounded-full border border-ivory/[0.03]" />

      {/* Inner ring dots */}
      <motion.div
        className="absolute inset-[18%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {[0, 90, 180, 270].map((a) => (
          <div
            key={a}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: `rotate(${a}deg) translateY(-50%)` }}
          >
            <span className="block h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-lavender/60 shadow-[0_0_10px_rgba(216,180,254,0.8)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
