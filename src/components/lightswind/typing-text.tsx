"use client";

import { motion, Variants } from "framer-motion";
import React, {
  ElementType,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { lockScroll as lockSmoothScroll, unlockScroll } from "@/lib/smooth-scroll";

export interface TypingTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  letterSpacing?: string;
  align?: "left" | "center" | "right";
  loop?: boolean;
  lockScroll?: boolean;
  onComplete?: () => void;
}

export const TypingText = ({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 2,
  fontSize = "text-4xl",
  fontWeight = "font-bold",
  color = "text-white",
  letterSpacing = "tracking-wide",
  align = "left",
  loop: _loop = false,
  lockScroll = false,
  onComplete,
}: TypingTextProps) => {
  const [textContent, setTextContent] = useState<string>("");

  useEffect(() => {
    if (!onComplete) return
    const total = (delay + duration) * 1000
    const t = setTimeout(() => onComplete(), total)
    return () => clearTimeout(t)
  }, [delay, duration, onComplete])

  useEffect(() => {
    if (!lockScroll) return
    const total = (delay + duration) * 1000
    lockSmoothScroll()
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      document.body.style.overflow = ''
      unlockScroll()
    }, total)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      unlockScroll()
    }
  }, [delay, duration, lockScroll])

  useEffect(() => {
    const extractText = (node: ReactNode): string => {
      if (typeof node === "string" || typeof node === "number") {
        return node.toString();
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }
      if (React.isValidElement(node)) {
        const element = node as React.ReactElement<any>;
        if (element.type === "br") {
          return "\n";
        }
        if (typeof element.props.children !== "undefined") {
          return extractText(element.props.children);
        }
      }
      return "";
    };

    setTextContent(extractText(children));
  }, [children]);

  const characters = textContent.split("").map((char) =>
    char === " " ? "\u00A0" : char
  );

  const characterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay + i * (duration / characters.length),
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  return React.createElement(
    Component as any,
    {
      className: cn(
        "inline-flex",
        className,
        fontSize,
        fontWeight,
        color,
        letterSpacing,
        align === "center"
          ? "justify-center text-center"
          : align === "right"
          ? "justify-end text-right"
          : "justify-start text-left"
      ),
    },
    <motion.span
      className="inline-block"
      initial="hidden"
      animate="visible"
      aria-label={textContent}
      role="text"
    >
      {characters.map((char, index) =>
        char === "\n" ? (
          <br key={`br-${index}`} />
        ) : (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            variants={characterVariants}
            custom={index}
            initial="hidden"
            animate="visible"
          >
            {char}
          </motion.span>
        )
      )}
    </motion.span>
  );
};
