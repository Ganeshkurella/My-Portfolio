"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button" || target.closest("button") || target.closest("a")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#00ffcc] mix-blend-difference pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovered ? 2.5 : 1,
          opacity: isHovered ? 0.5 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full border border-[#00bfff]/20 pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30, mass: 2 }}
      />
    </>
  );
}
