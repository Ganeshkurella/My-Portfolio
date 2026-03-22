"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Terminal, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";

// --- Custom Components ---

function TypewriterEffect() {
  const roles = ["AI Engineer", "Building Intelligent Systems", "AI + Web Developer"];
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 100;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    timeout = setTimeout(() => {
      setText(prev => 
        isDeleting 
          ? currentRole.slice(0, prev.length - 1) 
          : currentRole.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="flex justify-center items-center h-[2em] mb-4">
      <span className="text-2xl md:text-3xl lg:text-4xl font-mono text-[#00ffcc] text-glow">
        &gt; {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[3px] h-[1em] bg-[#00ffcc] ml-1 align-middle shadow-[0_0_10px_#00ffcc]"
        />
      </span>
    </div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

function MagneticButton({ children, className, onClick, variant, size }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { damping: 15, stiffness: 150, mass: 0.1 });
  const springY = useSpring(y, { damping: 15, stiffness: 150, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      x.set(middleX * 0.3);
      y.set(middleY * 0.3);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      style={{ x: springX, y: springY }} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <Button onClick={onClick} variant={variant} size={size} className="w-full sm:w-auto overflow-hidden group">
        {children}
      </Button>
    </motion.div>
  );
}

// --- Main Hero Component ---

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Pre-determined particles for static hydrating to avoid random mismatch
  const particles = [
    { width: 250, height: 250, left: "10%", top: "20%", bg: "rgba(0,255,204,0.08)", moveX: -30, moveY: 20 },
    { width: 300, height: 300, left: "70%", top: "60%", bg: "rgba(0,191,255,0.08)", moveX: 40, moveY: -30 },
    { width: 200, height: 200, left: "40%", top: "80%", bg: "rgba(204,0,255,0.08)", moveX: -20, moveY: -40 },
    { width: 350, height: 350, left: "80%", top: "10%", bg: "rgba(0,255,204,0.05)", moveX: 30, moveY: 30 },
    { width: 150, height: 150, left: "20%", top: "70%", bg: "rgba(0,191,255,0.05)", moveX: 20, moveY: -20 },
  ];

  return (
    <section ref={ref} id="hero" className="min-h-screen flex flex-col items-center justify-center relative pt-20 overflow-hidden">
      
      {/* Immersive Animated Background Grid + Particles */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00bfff]/10 via-background to-background" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Subtle glowing animated background particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full glow-overlay mix-blend-screen"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              background: `radial-gradient(circle, ${p.bg} 0%, transparent 70%)`
            }}
            animate={{
              x: [0, p.moveX, 0],
              y: [0, p.moveY, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 mt-12"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <TypewriterEffect />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 mix-blend-luminosity dark:mix-blend-lighten format-sans"
        >
          Turning ideas into real-world intelligent systems through code and discipline.
        </motion.p>


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
