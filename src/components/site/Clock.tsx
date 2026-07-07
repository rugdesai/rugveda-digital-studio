import { useEffect, useState } from "react";

export function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now
    ? now.toLocaleTimeString("en-US", { hour12: false })
    : "--:--:--";
  return (
    <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lavender opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lavender" />
      </span>
      <span>{time}</span>
      <span className="hidden sm:inline text-muted-foreground/60">· IST</span>
    </div>
  );
}
