"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { FolderGit2, X, Eye, Cpu, Target } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const projects = [
  {
    id: "phishield",
    title: "Phishield",
    subtitle: "AI-Powered Phishing Detection System",
    problem: "Traditional phishing detection relies heavily on static blocklists, which constantly lag behind zero-day threats and sophisticated social engineering attacks.",
    approach: "Developed a real-time system utilizing an LLM to dynamically analyze URLs, metadata, and email content. It identifies deceptive behavioral patterns structurally without needing prior database matches.",
    impact: "Provides instantaneous threat detection, forming a safer digital interaction layer that proactively blocks novel phishing attempts.",
    tech: ["Next.js", "Python", "Groq API", "React", "TypeScript", "TailwindCSS"],
    glow: "from-[#00ffcc]/20 to-transparent",
    border: "border-[#00ffcc]/30",
    color: "text-[#00ffcc]"
  },
  {
    id: "sports-talent",
    title: "AI Sports Assessment",
    subtitle: "Athletic Talent Identification via AI Analysis",
    problem: "Athletic scouting remains subjective and highly localized. Talented individuals in remote areas are frequently overlooked due to a lack of physical scouting presence.",
    approach: "Engineered a robust computer vision platform using Mediapipe to analyze video feeds representing athletic mechanics. Integrated AI to automatically output objective performance potential metrics.",
    impact: "Democratizes talent scouting globally. Allows standardized, precise evaluation metrics from simple mobile video recordings.",
    tech: ["Python", "Mediapipe", "OpenCV", "React"],
    glow: "from-[#00bfff]/20 to-transparent",
    border: "border-[#00bfff]/30",
    color: "text-[#00bfff]"
  },
  {
    id: "opencv",
    title: "OpenCV Engine",
    subtitle: "Real-Time Grayscale Matrix Converter",
    problem: "Edge environments require highly optimized, deeply low-latency image processing systems for real-time robotic or security vision applications.",
    approach: "Developed a highly streamlined pipeline optimized via OpenCV bindings to natively process and transform pixel matrices with minimal computational overhead in real-time.",
    impact: "Demonstrates high-efficiency edge processing capabilities by massively reducing latency in real-time camera feed grayscale conversions.",
    tech: ["Python", "OpenCV", "C++", "Numpy"],
    glow: "from-[#cc00ff]/20 to-transparent",
    border: "border-[#cc00ff]/30",
    color: "text-[#cc00ff]"
  }
];

function TiltCard({ project, onClick }: { project: any, onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [7, -7]);
  const rotateY = useTransform(x, [-100, 100], [-7, 7]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`glass-panel border ${project.border} rounded-3xl p-8 cursor-pointer relative group h-full flex flex-col`}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`} />
      
      {/* 3D Content Wrapper */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full pointer-events-none">
        <motion.div layoutId={`icon-${project.id}`} className="mb-6 w-12 h-12 rounded-xl glass-panel flex flex-col items-center justify-center border border-white/5">
          <FolderGit2 className={`w-6 h-6 ${project.color}`} />
        </motion.div>
        
        <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-foreground mb-2 font-sans tracking-tight">
          {project.title}
        </motion.h3>
        
        <motion.p layoutId={`subtitle-${project.id}`} className="text-sm font-mono text-zinc-400 mb-8 flex-grow">
          {project.subtitle}
        </motion.p>
        
        <motion.div layoutId={`tech-${project.id}`} className="flex flex-wrap gap-2 mt-auto">
          {project.tech.slice(0, 3).map((tech: string) => (
            <span key={tech} className="text-xs font-mono px-2 py-1 rounded-md bg-black/40 text-zinc-300 border border-white/10">
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs font-mono px-2 py-1 rounded-md bg-black/40 text-zinc-500 border border-white/5">
              +{project.tech.length - 3}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-32 relative perspective-1000">
      <SectionHeading 
        title="Deployed Architectures" 
        subtitle="Exploring the mechanics of my core systems and case studies."
        icon={<FolderGit2 className="w-5 h-5" />}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {projects.map((project) => (
            <div key={project.id} className="h-full perspective-1000">
              <TiltCard project={project} onClick={() => setSelectedId(project.id)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xl overflow-y-auto"
          >
            <div className="absolute inset-0" onClick={() => setSelectedId(null)} />
            
            {projects.map((project) => project.id === selectedId && (
              <motion.div
                layoutId={`card-container-${project.id}`}
                key="modal"
                className={`relative w-full max-w-4xl glass-panel border ${project.border} rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl z-10 bg-background/95 my-auto max-h-[90vh] overflow-y-auto`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-10 pointer-events-none`} />
                
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 rounded-full glass-panel hover:bg-white/10 transition-colors z-20"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>

                <div className="flex flex-col md:flex-row gap-8 items-start mb-8 border-b border-white/10 pb-8 relative z-10">
                  <motion.div layoutId={`icon-${project.id}`} className="w-16 h-16 rounded-2xl glass-panel flex flex-shrink-0 flex-col items-center justify-center border border-white/10">
                    <FolderGit2 className={`w-8 h-8 ${project.color}`} />
                  </motion.div>
                  
                  <div>
                    <motion.h3 layoutId={`title-${project.id}`} className="text-3xl md:text-5xl font-bold text-foreground mb-3 font-sans tracking-tight">
                      {project.title}
                    </motion.h3>
                    <motion.p layoutId={`subtitle-${project.id}`} className={`text-lg font-mono ${project.color}`}>
                      {project.subtitle}
                    </motion.p>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-zinc-300 font-mono text-sm border-b border-white/5 pb-2">
                      <Target className="w-4 h-4" /> THE PROBLEM
                    </div>
                    <p className="text-zinc-400 text-base leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-zinc-300 font-mono text-sm border-b border-white/5 pb-2">
                      <Cpu className="w-4 h-4" /> APPROACH
                    </div>
                    <p className="text-zinc-400 text-base leading-relaxed">
                      {project.approach}
                    </p>
                  </div>

                  <div className="md:col-span-2 space-y-3 mt-4 glass-panel p-6 rounded-2xl border border-white/5">
                    <div className={`flex items-center gap-2 font-mono text-sm pb-2 font-bold ${project.color}`}>
                      <Eye className="w-4 h-4" /> REAL-WORLD IMPACT
                    </div>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      {project.impact}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div layoutId={`tech-${project.id}`} className="flex flex-wrap gap-3 mt-8 relative z-10">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-sm font-mono px-4 py-2 rounded-md bg-black/50 text-zinc-300 border border-white/10 shadow-inner">
                      {tech}
                    </span>
                  ))}
                </motion.div>
                
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
