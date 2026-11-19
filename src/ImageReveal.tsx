"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import contactImageBlack from "@/assets/ContactImage.webp";
import AutoReveal from '@/components/AutoReveal';


interface VisualItem {
  key: number;
  url: string;
  label: string;
}

interface ImageRevealProps {
  label?: string;
  href?: string;
  image?: string;
}

const ImageReveal: React.FC<ImageRevealProps> = ({
  label = "More Info",
  href,
  image = contactImageBlack,
}) => {
  const [focusedItem, setFocusedItem] = useState<VisualItem | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const visualData: VisualItem[] = [
    {
      key: 1,
      url: image,
      label,
    },
  ];

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const updateScreen = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const onMouseTrack = (e: React.MouseEvent) => {
    // Use viewport coordinates: the preview is rendered in a portal (position: fixed)
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const onHoverActivate = (item: VisualItem) => {
    setFocusedItem(item);
  };

  const onHoverDeactivate = () => {
    setFocusedItem(null);
  };

  const contentClass =
    "inline-flex items-center gap-2 rounded-md border border-white/30 bg-[#151515] px-5 py-3 text-sm/6 font-normal text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 cursor-pointer";

  return (
    <div
      ref={containerRef}
      className="flex justify-center relative w-[400px] mx-auto min-h-fit"
      onMouseMove={onMouseTrack}
    >
      {visualData.map((item) => (
        <AutoReveal key={item.key}>
        {href ? (
          <Link
            to={href}
            className={contentClass}
            onMouseEnter={() => onHoverActivate(item)}
            onMouseLeave={onHoverDeactivate}
          >
            <span className="relative">
              {label}
            </span>
            <MoveRight size={16} />
          </Link>
        ) : (
          <div
            className={contentClass}
            onMouseEnter={() => onHoverActivate(item)}
            onMouseLeave={onHoverDeactivate}
          >
            <span className="relative">
              {label}
            </span>
            <MoveRight size={16} />
          </div>
        )}
        </AutoReveal>
      ))}

      {isLargeScreen && focusedItem && createPortal(
        <motion.img
          src={focusedItem.url}
          alt={focusedItem.label}
          className="fixed z-[9999] w-[400px] h-[200px] object-cover rounded-lg pointer-events-none shadow-2xl"
          style={{
            left: smoothX,
            top: smoothY,
            x: 20,
            y: 20,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />,
        document.body
      )}
    </div>
  );
};

export default ImageReveal;