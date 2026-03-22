"use client";

import { motion } from "framer-motion";
import { Zap, BrainCircuit, Target, Lightbulb } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const points = [
  {
    title: "Hackathons & Pressure",
    description: "Thriving under tight deadlines to rapidly prototype bold ideas. Building real-world solutions under pressure is where true engineering limits are tested.",
    icon: <Zap className="w-6 h-6" />,
    color: "group-hover:text-[#ffcc00] group-hover:drop-shadow-[0_0_15px_rgba(255,204,0,0.6)]"
  },
  {
    title: "AI & Real-World Impact",
    description: "Fascinated by the intersection of intelligent systems and human utility. I don't just train models; I deploy scalable architectures that solve actual problems.",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "group-hover:text-[#00ffcc] group-hover:drop-shadow-[0_0_15px_rgba(0,255,204,0.6)]"
  },
  {
    title: "Discipline & Consistency",
    description: "Code is a craft shaped by repetition. My mindset is rooted in unwavering consistency, deep focus, and prioritizing execution over perfection.",
    icon: <Target className="w-6 h-6" />,
    color: "group-hover:text-[#cc00ff] group-hover:drop-shadow-[0_0_15px_rgba(204,0,255,0.6)]"
  }
];

export function BeyondCode() {
  return (
    <section id="beyond-code" className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Beyond Code" 
          subtitle="The mindset and principles driving the engineering."
          icon={<Lightbulb className="w-5 h-5" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden flex flex-col items-start gap-4"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className={`text-zinc-500 transition-all duration-300 ${point.color}`}>
                {point.icon}
              </div>
              
              <h3 className="text-xl font-mono text-zinc-200 font-bold group-hover:text-white transition-colors duration-300">
                {point.title}
              </h3>
              
              <p className="text-zinc-500 text-base leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 font-light">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
