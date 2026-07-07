import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const NAME = ["RUGVEDA", "DESAI"] as const;

export function NameHero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative z-10 select-none text-center"
    >
      {NAME.map((word, wi) => (
        <div
          key={word}
          className="flex justify-center leading-[0.9] font-display font-medium tracking-[-0.03em]"
        >
          {word.split("").map((ch, i) => (
            <Letter key={`${wi}-${i}`} ch={ch} index={wi * 10 + i} sx={sx} sy={sy} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Letter({
  ch,
  index,
  sx,
  sy,
}: {
  ch: string;
  index: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const factor = 20 + (index % 3) * 10;
  const x = useTransform(sx, (v) => v * factor);
  const y = useTransform(sy, (v) => v * factor * 0.6);

  return (
    <motion.span
      initial={{ y: 80, opacity: 0, filter: "blur(20px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.9,
        delay: 0.15 + index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.08, color: "#e5a300" }}
      style={{ x, y, marginInline: "0.01em" }}
      className="inline-block text-[clamp(3.4rem,13.5vw,10.25rem)] text-ivory transition-colors"
    >
      {ch}
    </motion.span>
  );
}
