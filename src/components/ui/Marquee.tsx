import { cn } from "@/lib/utils";

export function Marquee({ className }: { className?: string }) {
  const items = [
    "AI", "Machine Learning", "Cybersecurity", "Next.js", "Python", "OpenCV", "Java", "Web Systems"
  ];
  // Add trailing bullet so the loop seamlessly joins the next block
  const content = items.join("  •  ") + "  •  ";

  return (
    <div className={cn("relative flex w-full overflow-hidden bg-black/10 py-6 backdrop-blur-sm border-y border-white/5", className)}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Marquee Container */}
      <div className="flex w-max animate-marquee cursor-default hover:[animation-play-state:paused]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center justify-center">
            <span className="text-2xl md:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:text-[#00ffcc] hover:drop-shadow-[0_0_20px_rgba(0,255,204,0.6)] transition-all duration-300 px-4 whitespace-pre">
              {content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
