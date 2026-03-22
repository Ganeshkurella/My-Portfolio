"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Marquee } from "../ui/Marquee";

const skillCategories = [
  {
    title: "Languages",
    color: "from-[#00ffcc]/10 to-transparent",
    borderColor: "border-[#00ffcc]/40",
    glow: "hover:shadow-[0_0_30px_rgba(0,255,204,0.2)]",
    skills: ["Python", "Java", "C"]
  },
  {
    title: "AI / ML",
    color: "from-[#00bfff]/10 to-transparent",
    borderColor: "border-[#00bfff]/40",
    glow: "hover:shadow-[0_0_30px_rgba(0,191,255,0.2)]",
    skills: ["Mediapipe", "OpenCV", "LLMs", "Streamlit"]
  },
  {
    title: "Web Engineering",
    color: "from-[#cc00ff]/10 to-transparent",
    borderColor: "border-[#cc00ff]/40",
    glow: "hover:shadow-[0_0_30px_rgba(204,0,255,0.2)]",
    skills: ["React", "Next.js", "Node.js", "Express"]
  },
  {
    title: "Tools & Infrastructure",
    color: "from-[#ffcc00]/10 to-transparent",
    borderColor: "border-[#ffcc00]/40",
    glow: "hover:shadow-[0_0_30px_rgba(255,204,0,0.2)]",
    skills: ["Git", "GitHub", "Vercel", "Antigravity"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      <SectionHeading 
        title="Tech Stack" 
        subtitle="The toolset utilized to architect and deploy intelligent systems."
        icon={<Layers className="w-5 h-5" />}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 w-full overflow-hidden rounded-full">
          <Marquee />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`glass-panel border ${category.borderColor} bg-gradient-to-br ${category.color} rounded-2xl p-8 relative overflow-hidden group transition-all duration-500`}
            >
              <div className={`absolute inset-0 opacity-0 group-[.light]:opacity-0 transition-opacity duration-500 ${category.glow} rounded-2xl pointer-events-none`} />
              
              <h3 className="text-2xl font-mono font-bold text-foreground mb-8 relative z-10 group-hover:scale-105 origin-left transition-transform duration-300">
                {category.title}
                <span className="block mt-2 h-[2px] w-12 bg-current opacity-30 group-hover:w-full transition-all duration-500" />
              </h3>
              
              <ul className="space-y-4 relative z-10">
                {category.skills.map((skill, sIdx) => (
                  <motion.li
                    key={skill}
                    whileHover={{ x: 8, color: "var(--foreground)" }}
                    className="flexItems-center space-x-3 text-zinc-500 font-mono text-base transition-colors"
                  >
                    <span className="text-xs opacity-50">&gt;</span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
