"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-[#00ffcc] text-black hover:bg-[#00e6b8] hover:shadow-[0_0_15px_rgba(0,255,204,0.6)] font-semibold border border-transparent",
      secondary: "bg-[#00bfff] text-black hover:bg-[#00ace6] hover:shadow-[0_0_15px_rgba(0,191,255,0.6)] font-semibold border border-transparent",
      outline: "bg-transparent text-[#00ffcc] border border-[#00ffcc] hover:bg-[#00ffcc]/10 hover:shadow-[0_0_10px_rgba(0,255,204,0.3)]",
      ghost: "bg-transparent text-zinc-300 hover:text-white hover:bg-white/5",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors duration-300",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
