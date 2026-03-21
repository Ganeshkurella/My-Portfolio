"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Mail, Github, Linkedin, Download } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

export function Contact() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section id="contact" className="py-32 relative min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
        <SectionHeading 
          title="End of Stream" 
          subtitle="Connection established. Looking for new opportunities or just want to chat?"
          icon={<Mail className="w-5 h-5" />}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onMouseMove={handleMouseMove}
          className="glass-panel border-white/10 rounded-[3rem] p-10 md:p-20 mt-12 relative overflow-hidden group shadow-2xl"
        >
          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-60 mix-blend-color-dodge z-0"
            style={{
              background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(0,255,204,0.1), transparent 40%)`,
            }}
          />
          
          <h3 className="text-4xl md:text-6xl font-bold text-foreground mb-8 relative z-10 tracking-tighter">
            Let&apos;s build something <span className="italic font-light">incredible.</span>
          </h3>
          <p className="text-zinc-500 mb-12 max-w-2xl mx-auto relative z-10 text-lg md:text-xl font-light leading-relaxed">
            My inbox is always open. Whether you have a question about machine learning architectures, web development, or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <motion.a 
              href="mailto:kurellaganesh123@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-mono rounded-full font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
            >
              <Mail className="w-5 h-5" /> ping --email
            </motion.a>
            <motion.a 
              href="/Ganesh_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              download="Ganesh_Kurella_Resume.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 glass-panel font-mono rounded-full hover:bg-white/5 transition-colors border border-white/10"
            >
              <Download className="w-5 h-5" /> Download_CV
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-10 mt-20 relative z-10">
            <MagneticSocialLink href="https://github.com/Ganeshkurella" icon={<Github className="w-8 h-8" />} color="hover:text-[#00ffcc]" />
            <MagneticSocialLink href="https://www.linkedin.com/in/ganesh-kurella-168056332/" icon={<Linkedin className="w-8 h-8" />} color="hover:text-[#00bfff]" />
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center text-zinc-600 font-mono text-xs tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} GANESH KURELLA // ADVANCED UI</p>
      </div>
    </section>
  );
}

function MagneticSocialLink({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`text-zinc-500 transition-colors p-4 glass-panel rounded-full border border-white/5 ${color}`}
    >
      {icon}
    </motion.a>
  );
}
