"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import contactImage from "@/assets/ContactImageWhite.png";
import AutoReveal from '@/components/AutoReveal';



interface VisualItem {
  key: number;
  url: string;
  label: string;
}

interface ImageRevealProps {
  image?: string;
  label?: string;
  href?: string;
}

const ImageReveal: React.FC<ImageRevealProps> = ({
  image = contactImage,
  label = "Get In Touch",
  href,
}) => {
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

  const items = [{ key: 1, url: image, label }];
  const isExternal = !!href?.startsWith("http");
  return (
    <div
      className="relative w-fit min-h-fit"
      onMouseMove={onMouseTrack}
      onMouseLeave={onHoverDeactivate}
    >
      {items.map((item) => {
        const inner = (
          <>
            <Phone />
            <span className="relative">{item.label}</span>
          </>
        );
        const contentClass =
          "inline-flex items-center gap-2 rounded-md border border-white/30 bg-[#151515] px-5 py-3 text-sm/6 font-normal text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 cursor-pointer";

        return (
          <AutoReveal key={item.key}>
            {href ? (
              isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={contentClass}
                  onMouseEnter={() => onHoverActivate(item)}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  to={href}
                  className={contentClass}
                  onMouseEnter={() => onHoverActivate(item)}
                >
                  {inner}
                </Link>
              )
            ) : (
              <div
                className={contentClass}
                onMouseEnter={() => onHoverActivate(item)}
              >
                {inner}
              </div>
            )}
          </AutoReveal>
        );
      })}

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
