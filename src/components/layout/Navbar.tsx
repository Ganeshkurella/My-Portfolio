"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Terminal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const links = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-500 px-6 ${
        scrolled ? "py-2" : "py-6"
      }`}
    >
      <div className={`w-full max-w-7xl mx-auto flex items-center justify-between rounded-full transition-all duration-500 px-6 py-3 ${scrolled ? "glass-panel" : "bg-transparent"}`}>
        
        <a href="#" className="flex items-center gap-2 group">
          <Terminal className="w-6 h-6 text-[#00ffcc] drop-shadow-[0_0_8px_rgba(0,255,204,0.8)] transition-all" />
          <span className="font-mono font-bold tracking-tighter text-foreground group-hover:text-[#00ffcc] transition-colors">
            GANESH<span className="text-[#00bfff]">.SYS</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <a
                href={link.href}
                className="text-sm font-mono text-zinc-400 hover:text-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all relative group"
              >
                <span className="text-[#00bfff]/50 mr-1 opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}.</span>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00ffcc] group-hover:w-full transition-all duration-300" />
              </a>
            </motion.li>
          ))}
        </ul>
        
        <div className="flex flex-row items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-zinc-800/50 dark:hover:bg-zinc-200/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-zinc-300" /> : <Moon className="w-5 h-5 text-zinc-700" />}
            </button>
          )}
        </div>

      </div>
    </motion.header>
  );
}
