"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export function TerminalIntro() {
  const [show, setShow] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [phase, setPhase] = useState(0);

  const script = [
    "initializing system...",
    "loading profile...",
    "AI Engineer detected: Ganesh Kurella",
    "launching portfolio..."
  ];

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("introSeen");
    if (!hasVisited) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!show) return;

    let isCancelled = false;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const playIntro = async () => {
      await sleep(500); // Initial delay

      for (let i = 0; i < script.length; i++) {
        const fullText = script[i];
        for (let j = 0; j <= fullText.length; j++) {
          if (isCancelled) return;
          setCurrentLineText(fullText.slice(0, j));
          await sleep(Math.random() * 40 + 30); // Typing speed
        }
        if (isCancelled) return;
        setLines((prev) => [...prev, fullText]);
        setCurrentLineText("");
        await sleep(400); // Pause between lines
      }

      if (isCancelled) return;
      setPhase(-1); // Hide cursor before unmounting
      await sleep(800);
      
      if (isCancelled) return;
      sessionStorage.setItem("introSeen", "true");
      setShow(false);
    };

    playIntro();

    return () => {
      isCancelled = true;
    };
  }, [show]);

  const handleSkip = () => {
    sessionStorage.setItem("introSeen", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="terminal-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center p-4 sm:p-6 text-[#00ffcc] font-mono"
        >
          <div className="w-full max-w-3xl glass-panel border border-[#00ffcc]/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,204,0.1)] relative">
            <div className="bg-black/40 px-4 py-2 border-b border-[#00ffcc]/20 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span className="text-sm text-zinc-400">root@ganesh-system:~</span>
            </div>
            
            <div className="p-6 md:p-8 min-h-[300px] flex flex-col">
              {lines.map((line, i) => (
                <div key={i} className="mb-2">
                  <span className="text-zinc-500 mr-2">&gt;</span> {line}
                </div>
              ))}
              
              {phase !== -1 && lines.length < script.length && (
                <div className="mb-2 text-[#00ffcc]">
                  <span className="text-zinc-500 mr-2">&gt;</span> 
                  {currentLineText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-[#00ffcc] align-middle ml-1 shadow-[0_0_8px_#00ffcc]"
                  />
                </div>
              )}
            </div>
            
            <button 
              onClick={handleSkip}
              className="absolute bottom-4 right-4 text-xs tracking-widest text-zinc-500 hover:text-[#00ffcc] transition-colors uppercase"
            >
              [ Skip Intro ]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
