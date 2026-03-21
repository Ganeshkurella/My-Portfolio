"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { Terminal, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="hero" className="min-h-screen flex flex-col items-center justify-center relative pt-20 overflow-hidden">
      
      {/* Immersive Animated Background Grid */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00bfff]/10 via-background to-background" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="container mx-auto px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_10px_#00ffcc]" />
          <span className="text-sm font-mono text-zinc-400">System Online // Version 2.0</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 text-foreground drop-shadow-2xl">
            Ganesh <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] via-[#00bfff] to-[#cc00ff] filter drop-shadow-[0_0_20px_rgba(0,191,255,0.4)]">Kurella</span>
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl font-mono text-zinc-500 mb-8"
        >
          &gt; AI Engineer_
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-12 mix-blend-luminosity dark:mix-blend-lighten"
        >
          Building intelligent web systems. Bridging the gap between cutting-edge artificial intelligence and high-performance modern web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#projects">
            <Button variant="primary" size="lg" className="w-full sm:w-auto overflow-hidden group shadow-[0_0_20px_rgba(0,255,204,0.3)]">
              <span className="relative z-10 flex items-center gap-2 font-mono tracking-tight">
                <Terminal className="w-4 h-4" /> Execute Projects
              </span>
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-mono backdrop-blur-sm bg-black/10">
              Initialize Contact
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <a href="#about" className="text-zinc-500 hover:text-[#00ffcc] transition-colors flex flex-col items-center gap-2">
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </a>
      </motion.div>

      {/* Foreground gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
