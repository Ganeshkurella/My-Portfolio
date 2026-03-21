"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Award } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const achievements = [
  {
    year: "Recent",
    title: "Internship at EvolveX",
    description: "Secured an internship role for outstanding performance and building an AI Healthcare assistant at the HackForge Hackathon."
  },
  {
    year: "48-Hour",
    title: "HackForge - AI Personal HealthCare Assistant",
    description: "Participated and built an AI-based Personal Healthcare Assistant over a continuous 48-hour sprint."
  },
  {
    year: "24-Hour",
    title: "GLITCH - Hospital Resource Predictor",
    description: "Developed a predictive model for mapping and forecasting hospital resources."
  },
  {
    year: "Hackathon",
    title: "SIH - AI based Sports Assessment",
    description: "Smart India Hackathon participant. Built the core logic for automated athletic assessment."
  },
  {
    year: "24-Hour",
    title: "Avinya - Smart Finance Advisor",
    description: "Engineered an intelligent financial advisory tool under extreme time constraints."
  },
  {
    year: "Hackathon",
    title: "GDG on Campus - Smart Campus Idea",
    description: "Conceptualized and presented a highly scalable Smart Campus framework."
  }
];

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="achievements" className="py-32 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Timeline.Log" 
          subtitle="Milestones, internships, and 5 completed global hackathons."
          icon={<Trophy className="w-5 h-5" />}
        />

        <div className="max-w-4xl mx-auto relative mt-20">
          
          {/* Animated Timeline Center Beam */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -translate-x-1/2 rounded-full overflow-hidden">
             <motion.div 
               style={{ height: beamHeight }}
               className="w-full bg-gradient-to-b from-[#00ffcc] via-[#00bfff] to-[#cc00ff] shadow-[0_0_15px_#00ffcc]"
             />
          </div>

          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.4 }}
              className={`relative flex flex-col md:flex-row items-center justify-between mb-20 ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <motion.div 
                whileInView={{ scale: [0, 1.5, 1], rotate: 180 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute left-4 md:left-1/2 w-8 h-8 rounded-xl glass-panel flex flex-col items-center justify-center -translate-x-1/2 z-10 border border-[#00bfff]/50 backdrop-blur-xl"
              >
                 <div className="w-2 h-2 rounded-full bg-[#00bfff] shadow-[0_0_10px_#00bfff]" />
              </motion.div>

              <div className="w-full pl-16 md:pl-0 md:w-5/12" />

              <div className={`w-full pl-16 md:pl-0 md:w-[45%] ${idx % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#00bfff]/30 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,191,255,0.1)] relative overflow-hidden">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00bfff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`flex flex-col gap-2 mb-4 relative z-10 ${idx % 2 !== 0 && "md:items-end"}`}>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#00bfff]" />
                      <span className="text-xs font-mono tracking-widest uppercase text-[#00bfff] px-2 py-1 rounded-sm bg-[#00bfff]/10 border border-[#00bfff]/20">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-glow-blue transition-all relative z-10 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed relative z-10 font-light">
                    {item.description}
                  </p>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
