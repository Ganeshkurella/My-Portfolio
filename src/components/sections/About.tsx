"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Cpu, Code2 } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  
  // Parallax layers
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00ffcc]/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Entity.Profile" 
          subtitle="Decrypting the background and core directives."
          icon={<User className="w-5 h-5" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          <motion.div style={{ y: y1 }} className="space-y-8 glass-panel p-8 md:p-12 rounded-3xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ffcc]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-foreground text-lg md:text-xl leading-relaxed font-light"
            >
              I am a student at CMRIT on a mission to become an elite AI Engineer. Currently, I hold strong foundational knowledge in both Artificial Intelligence and modern Web technologies. Combining these two domains allows me to build products that are both robust in their overarching logic and engaging in their user experience.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-500 text-lg md:text-xl leading-relaxed"
            >
              My passion lies in bridging the gap between intelligent machine learning models and seamless, fast web architectures. Whether it&apos;s predicting outcomes or detecting anomalies, I aim to create systems that look visually stunning and solve real world problems securely.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <div className="flex items-center gap-2 text-[#00ffcc] bg-black/40 backdrop-blur-md px-5 py-3 rounded-xl font-mono text-sm border border-[#00ffcc]/30 shadow-[0_0_15px_rgba(0,255,204,0.1)] hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] transition-all">
                <Cpu className="w-4 h-4" /> Machine Learning
              </div>
              <div className="flex items-center gap-2 text-[#00bfff] bg-black/40 backdrop-blur-md px-5 py-3 rounded-xl font-mono text-sm border border-[#00bfff]/30 shadow-[0_0_15px_rgba(0,191,255,0.1)] hover:shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-all">
                <Code2 className="w-4 h-4" /> Web Systems
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="relative h-full flex items-center justify-center">
            {/* Holographic Image Container */}
            <motion.div 
              className="relative aspect-square w-full max-w-sm rounded-3xl p-[1px] bg-gradient-to-br from-[#00ffcc]/50 via-zinc-800 to-[#00bfff]/50 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-[#00ffcc]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative w-full h-full rounded-[23px] overflow-hidden bg-background/90 backdrop-blur-3xl flex items-center justify-center font-mono text-zinc-700 text-7xl font-bold border border-white/5">
                {/* Simulated depth layers inside */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,204,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-scan group-hover:opacity-100 opacity-50 transition-opacity" />
                
                <span className="relative z-10 drop-shadow-[0_0_15px_currentColor] group-hover:text-zinc-600 transition-colors duration-500">
                  &lt;ID /&gt;
                </span>

                {/* Corner markers */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00ffcc]/50" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00ffcc]/50" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00ffcc]/50" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00ffcc]/50" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
