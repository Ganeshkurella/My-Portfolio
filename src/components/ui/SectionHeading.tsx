"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
}

export function SectionHeading({ title, subtitle, className, children, icon }: SectionHeadingProps) {
  return (
    <div className={cn("mb-24 flex flex-col items-center justify-center text-center", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-3 mb-6 relative"
      >
        <div className="absolute inset-0 bg-[#00ffcc]/10 blur-2xl rounded-full" />
        
        {icon && (
          <span className="text-[#00ffcc] relative z-10 bg-[#00ffcc]/10 p-3 rounded-2xl border border-[#00ffcc]/30 shadow-[0_0_20px_rgba(0,255,204,0.2)]">
            {icon}
          </span>
        )}
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground font-sans uppercase relative"
      >
        {title}
        {/* Subtle drop shadow behind the text */}
        <span className="absolute inset-0 text-[#00ffcc] blur-2xl opacity-20 -z-10 select-none pointer-events-none">{title}</span>
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-500 max-w-2xl text-lg md:text-xl mt-6 font-light tracking-wide"
        >
          {subtitle}
        </motion.p>
      )}
      
      {children}
      
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
        className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#00ffcc]/50 to-transparent mt-10 shadow-[0_0_10px_rgba(0,255,204,0.5)]"
      />
    </div>
  );
}
