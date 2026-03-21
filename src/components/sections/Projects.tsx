"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, X } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const projects = [
  {
    id: "phishield",
    title: "Phishield",
    subtitle: "AI Phishing Detection System",
    description: "An advanced AI-powered phishing detection system leveraging real-time analysis and machine learning models to identify and block deceptive URLs and email contents with high accuracy. Built with a focus on instantaneous threat detection.",
    tech: ["TypeScript", "Next.js", "Python", "LLMs", "React"],
    glow: "from-[#00ffcc]/20 to-transparent",
    border: "border-[#00ffcc]/30"
  },
  {
    id: "sports-talent",
    title: "AI Sports Assessment",
    subtitle: "Computer Vision Analysis",
    description: "A computer vision platform built during the SIH hackathon that analyzes athletic movements from video feeds. Tracks poses and provides automated performance metrics for scouting and real-time form correction.",
    tech: ["Python", "Mediapipe", "OpenCV", "React"],
    glow: "from-[#00bfff]/20 to-transparent",
    border: "border-[#00bfff]/30"
  },
  {
    id: "opencv",
    title: "OpenCV Image Processor",
    subtitle: "High-Performance Edge Processing",
    description: "High-performance Python pipeline utilizing OpenCV for real-time video stream grayscale conversion, edge detection, and matrix transformations optimized for processing efficiency on edge hardware and constrained environments.",
    tech: ["Python", "OpenCV"],
    glow: "from-[#cc00ff]/20 to-transparent",
    border: "border-[#cc00ff]/30"
  }
];

export function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-32 relative">
      <SectionHeading 
        title="Active Modules" 
        subtitle="Executed directives, pipelines, and deployed intelligent systems."
        icon={<FolderGit2 className="w-5 h-5" />}
      />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              layoutId={`card-${project.id}`}
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className={`glass-panel border ${project.border} rounded-3xl p-8 cursor-pointer relative overflow-hidden group`}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-0 group-[.light]:opacity-0 transition-opacity duration-500`} />
              
              <motion.div layoutId={`icon-${project.id}`} className="mb-8 relative z-10 w-12 h-12 rounded-xl glass-panel flex flex-col items-center justify-center">
                <FolderGit2 className="w-6 h-6 text-foreground" />
              </motion.div>
              
              <motion.h3 layoutId={`title-${project.id}`} className="text-2xl font-bold text-foreground mb-2 relative z-10 font-sans tracking-tight">
                {project.title}
              </motion.h3>
              
              <motion.p layoutId={`subtitle-${project.id}`} className="text-sm font-mono text-zinc-500 mb-8 relative z-10">
                {project.subtitle}
              </motion.p>
              
              <motion.div layoutId={`tech-${project.id}`} className="flex flex-wrap gap-2 relative z-10">
                {project.tech.slice(0, 3).map(tech => (
                  <span key={tech} className="text-xs font-mono px-2 py-1 rounded-md glass-panel text-zinc-400 border border-white/5">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs font-mono px-2 py-1 rounded-md glass-panel text-zinc-400 border border-white/5">
                    +{project.tech.length - 3}
                  </span>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-xl"
          >
            <div className="absolute inset-0" onClick={() => setSelectedId(null)} />
            
            {projects.map((project) => project.id === selectedId && (
              <motion.div
                layoutId={`card-${project.id}`}
                key="modal"
                className={`relative w-full max-w-3xl glass-panel border ${project.border} rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl z-10 bg-background/90`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.glow} opacity-10 pointer-events-none`} />
                
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 rounded-full glass-panel hover:bg-white/10 transition-colors z-20"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>

                <motion.div layoutId={`icon-${project.id}`} className="mb-8 w-16 h-16 rounded-2xl glass-panel flex flex-col items-center justify-center">
                  <FolderGit2 className="w-8 h-8 text-foreground" />
                </motion.div>
                
                <motion.h3 layoutId={`title-${project.id}`} className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-sans tracking-tight">
                  {project.title}
                </motion.h3>
                
                <motion.p layoutId={`subtitle-${project.id}`} className="text-lg font-mono text-zinc-500 mb-8 border-b border-white/10 pb-8">
                  {project.subtitle}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-12"
                >
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
                
                <motion.div layoutId={`tech-${project.id}`} className="flex flex-wrap gap-3 mt-auto">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-sm font-mono px-4 py-2 rounded-md glass-panel text-zinc-300 border border-white/10 shadow-inner">
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
