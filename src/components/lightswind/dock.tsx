// components/Dock.tsx
"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useDockItemSize(
  mouseY: MotionValue<number>,
  baseItemSize: number,
  magnification: number,
  distance: number,
  ref: React.RefObject<HTMLDivElement | null>,
  spring: { mass: number; stiffness: number; damping: number }
) {
  const mouseDistance = useTransform(mouseY, (val) => {
    if (typeof val !== "number" || isNaN(val)) return 0;
    const rect = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: baseItemSize,
    };
    return val - rect.y - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );

  return useSpring(targetSize, spring);
}

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  mouseY: MotionValue<number>;
  baseItemSize: number;
  magnification: number;
  distance: number;
  spring: { mass: number; stiffness: number; damping: number };
  badgeCount?: number;
  badgeColor?: string;
  itemBackground?: string;
  itemBorderColor?: string;
  borderRadius?: string;
  hideLabels?: boolean;
  labelPosition?: "top" | "bottom" | "left" | "right";
  labelBackground?: string;
  labelTextColor?: string;
}

function DockItem({
  icon,
  label,
  onClick,
  mouseY,
  baseItemSize,
  magnification,
  distance,
  spring,
  badgeCount,
  badgeColor = "bg-red-500",
  itemBackground,
  itemBorderColor,
  borderRadius,
  hideLabels = false,
  labelPosition = "right",
  labelBackground,
  labelTextColor,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const size = useDockItemSize(mouseY, baseItemSize, magnification, distance, ref, spring);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (value) =>
      setShowLabel(value === 1)
    );
    return () => unsubscribe();
  }, [isHovered]);

  const labelOffsetStyle =
    labelPosition === "bottom"
      ? { top: "calc(100% + 8px)", bottom: "auto" }
      : labelPosition === "right"
      ? { left: "calc(100% + 8px)", right: "auto", top: "50%", transform: "translateY(-50%)" }
      : labelPosition === "left"
      ? { right: "calc(100% + 8px)", left: "auto", top: "50%", transform: "translateY(-50%)" }
      : { bottom: "calc(100% + 8px)", top: "auto" };

  const tooltipAnimY = labelPosition === "bottom" ? -4 : 4;

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer text-white",
        borderRadius ?? "rounded-md",
        itemBackground ?? "bg-transparent",
        itemBorderColor ? `border ${itemBorderColor}` : "border border-[#ffffff4d]"
      )}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <div className="flex items-center justify-center">{icon}</div>

      {/* Badge */}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          className={cn(
            "absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full",
            badgeColor
          )}
        >
          {badgeCount > 99 ? "99+" : badgeCount}
        </span>
      )}

      {/* Tooltip Label */}
      {!hideLabels && (
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, y: tooltipAnimY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: tooltipAnimY }}
              transition={{ duration: 0.18 }}
              className={cn(
                "absolute left-1/2 w-fit whitespace-pre rounded-md border px-2 py-0.5 text-xs pointer-events-none z-50",
                labelBackground ?? "bg-[#060606]",
                labelTextColor ?? "text-white"
              )}
              style={{ x: "-50%", ...labelOffsetStyle }}
              role="tooltip"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

interface DockItemData {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badgeCount?: number;
}

interface DockProps {
  /** Items to render inside the dock. Each needs an icon, label, and optional onClick + badgeCount. */
  items: DockItemData[];
  /** Extra CSS classes for the dock panel container. */
  className?: string;
  /** Framer Motion spring physics for all animations. */
  spring?: { mass: number; stiffness: number; damping: number };
  /** Maximum size in px items magnify to on hover. @default 70 */
  magnification?: number;
  /** Distance in px over which magnification spreads to neighbours. @default 200 */
  distance?: number;
  /** Base (idle) size of each item in px. @default 50 */
  baseItemSize?: number;
  /** Gap between dock items. Tailwind gap class e.g. "gap-2", "gap-6". @default "gap-4" */
  gap?: string;
  /** Background color for individual item icons. Tailwind class or CSS value. */
  itemBackground?: string;
  /** Border color class for each item (e.g. "border-zinc-300"). */
  itemBorderColor?: string;
  /** Border radius override for items. Tailwind class (e.g. "rounded-xl"). @default "rounded-full" */
  borderRadius?: string;
  /** Color for the notification badge dot. Tailwind bg class. @default "bg-red-500" */
  badgeColor?: string;
  /** Whether to hide all hover labels. @default false */
  hideLabels?: boolean;
  /** Position of the hover label relative to the icon. @default "right" */
  labelPosition?: "top" | "bottom" | "left" | "right";
  /** Background for the hover label tooltip. Tailwind class. @default "bg-[#060606]" */
  labelBackground?: string;
  /** Text color for the hover label tooltip. Tailwind class. @default "text-white" */
  labelTextColor?: string;
  /** If true, renders a frosted glass blur panel behind the dock. @default false */
  blurBackground?: boolean;
  /** If true, wraps the dock with the blocks multi-layer border concept frame. @default true */
  multiBorder?: boolean;
  /** Show a visual separator line. @default false */
  showSeparator?: boolean;
  /** Index after which the separator is placed (0-based). */
  separatorIndex?: number;
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 56,
  distance = 200,
  baseItemSize = 40,
  gap = "gap-3",
  itemBackground,
  itemBorderColor,
  borderRadius,
  badgeColor = "bg-red-500",
  hideLabels = false,
  labelPosition = "right",
  labelBackground,
  labelTextColor,
  blurBackground = false,
  multiBorder = true,
  showSeparator = false,
  separatorIndex,
}: DockProps) {
  const mouseY = useMotionValue(Infinity);

  // Responsive sizing: thin on small laptops (<1280px), medium on large (>=1280px)
  const [isLargeLaptop, setIsLargeLaptop] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1280px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsLargeLaptop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const effectiveBaseItemSize = isLargeLaptop
    ? baseItemSize
    : Math.round(baseItemSize * 0.85);
  const effectiveMagnification = isLargeLaptop
    ? magnification
    : Math.round(magnification * 0.85);

  return (
    <motion.div
      onMouseMove={({ clientY }) => {
        mouseY.set(clientY);
      }}
      onMouseLeave={() => {
        mouseY.set(Infinity);
      }}
      className={cn(
        "flex flex-col items-center rounded-md px-2 py-3 shadow-lg transition-[transform,background-color,color] duration-300",
        multiBorder
          ? "border border-zinc-200/80 dark:border-zinc-600/80 bg-[#151515] backdrop-blur-md lg:backdrop-blur-xl"
          : blurBackground
          ? "bg-white/10 dark:bg-black/20 backdrop-blur-md lg:backdrop-blur-xl border-2 border-white/20 dark:border-white/10 shadow-md"
          : "bg-background border-2 border-border shadow-md",
        gap,
        className
      )}
      style={{ width: effectiveMagnification + 16 }}
      role="toolbar"
      aria-label="Application dock"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <DockItem
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            mouseY={mouseY}
            baseItemSize={effectiveBaseItemSize}
            magnification={effectiveMagnification}
            distance={distance}
            spring={spring}
            badgeCount={item.badgeCount}
            badgeColor={badgeColor}
            itemBackground={itemBackground}
            itemBorderColor={itemBorderColor}
            borderRadius={borderRadius}
            hideLabels={hideLabels}
            labelPosition={labelPosition}
            labelBackground={labelBackground}
            labelTextColor={labelTextColor}
          />
          {showSeparator && separatorIndex === index && (
            <div className="self-center h-8 w-px bg-zinc-300 dark:bg-zinc-600 mx-1 shrink-0" />
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
}

export { Dock };