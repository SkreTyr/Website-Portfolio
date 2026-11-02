"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Phone } from "lucide-react";
import contactImage from "@/assets/ContactImageWhite.png";
import AutoReveal from '@/components/AutoReveal'; 

interface VisualItem {
  key: number;
  url: string;
  label: string;
}

const visualData: VisualItem[] = [
  {
    key: 1,
    url: contactImage, 
    label: "Get In Touch",
  },
];

const ImageReveal: React.FC = () => {
  const [focusedItem, setFocusedItem] = useState<VisualItem | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

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
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const onHoverActivate = (item: VisualItem) => {
    setFocusedItem(item);
  };

  const onHoverDeactivate = () => {
    setFocusedItem(null);
  };

  return (
    <div
      className="relative w-fit min-h-fit"
      onMouseMove={onMouseTrack}
      onMouseLeave={onHoverDeactivate}
    >
      {visualData.map((item) => (
        <AutoReveal>
        <div
          key={item.key}
          className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-[#151515] px-5 py-3 text-sm/6 font-normal text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 cursor-pointer"
          onMouseEnter={() => onHoverActivate(item)}
        >
          <Phone />
          <span className="relative">
            {item.label}
          </span>
        </div>
        </AutoReveal>
      ))}

      {isLargeScreen && focusedItem && (
        <motion.img
          src={focusedItem.url}
          alt={focusedItem.label}
          className="fixed z-50 object-cover w-[400px] h-[200px] rounded-lg pointer-events-none shadow-2xl"
          style={{
            left: smoothX,
            top: smoothY,
            x: "20px",
            y: "20px",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
};

export default ImageReveal;
