"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useNavbarItemSize(
  mouseX: MotionValue<number>,
  baseItemSize: number,
  magnification: number,
  distance: number,
  ref: React.RefObject<HTMLDivElement | null>,
  spring: { mass: number; stiffness: number; damping: number }
) {
  const mouseDistance = useTransform(mouseX, (val) => {
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

interface NavbarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  mouseX: MotionValue<number>;
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

function NavbarItem({
  icon,
  label,
  onClick,
  mouseX,
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
  labelPosition = "top",
  labelBackground,
  labelTextColor,
}: NavbarItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const size = useNavbarItemSize(mouseX, baseItemSize, magnification, distance, ref, spring);
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

  return (
    <motion.div
      ref={ref}
      style={{ width: baseItemSize, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center shadow-md cursor-pointer",
        borderRadius ?? "rounded-full",
        itemBackground ?? "bg-background",
        itemBorderColor ? `border-2 ${itemBorderColor}` : ""
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
              initial={{ opacity: 0, y: labelPosition === "bottom" ? -4 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: labelPosition === "bottom" ? -4 : 4 }}
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

interface NavbarItemData {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badgeCount?: number;
}

interface NavbarProps {
  /** Items to render inside the Navbar. Each needs an icon, label, and optional onClick + badgeCount. */
  items: NavbarItemData[];
  /** Extra CSS classes for the Navbar panel container. */
  className?: string;
  /** Framer Motion spring physics for all animations. */
  spring?: { mass: number; stiffness: number; damping: number };
  /** Maximum size in px items magnify to on hover. @default 70 */
  magnification?: number;
  /** Distance in px over which magnification spreads to neighbours. @default 200 */
  distance?: number;
  /** Navbar panel height in px when idle. @default 64 */
  panelHeight?: number;
  /** Navbar panel max height in px when expanded. @default 256 */
  NavbarHeight?: number;
  /** Base (idle) size of each item in px. @default 50 */
  baseItemSize?: number;
  /** Navbar position on screen. Only "bottom" is currently animated. @default "bottom" */
  position?: "bottom" | "top";
  /** Gap between Navbar items. Tailwind gap class e.g. "gap-2", "gap-6". @default "gap-4" */
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
  /** Position of the hover label relative to the icon. @default "top" */
  labelPosition?: "top" | "bottom" | "left" | "right";
  /** Background for the hover label tooltip. Tailwind class. @default "bg-[#060606]" */
  labelBackground?: string;
  /** Text color for the hover label tooltip. Tailwind class. @default "text-white" */
  labelTextColor?: string;
  /** If true, renders a frosted glass blur panel behind the Navbar. @default false */
  blurBackground?: boolean;
  /** If true, wraps the Navbar with the blocks multi-layer border concept frame. @default true */
  multiBorder?: boolean;
  /** Show a visual separator line. @default false */
  showSeparator?: boolean;
  /** Index after which the separator is placed (0-based). */
  separatorIndex?: number;
}

export default function Navbar({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 400,
  NavbarHeight = 256,
  baseItemSize = 50,
  gap = "gap-4",
  itemBackground,
  itemBorderColor,
  borderRadius,
  badgeColor = "bg-red-500",
  hideLabels = false,
  labelPosition = "top",
  labelBackground,
  labelTextColor,
  blurBackground = false,
  multiBorder = true,
  showSeparator = false,
  separatorIndex,
}: NavbarProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(NavbarHeight, magnification * 2 + 8),
    [magnification, NavbarHeight]
  );

  const animatedHeight = useSpring(
    useTransform(isHovered, [0, 1], [panelHeight, maxHeight]),
    spring
  );

  return (
    <motion.div
      style={{ height: animatedHeight }}
      className="mx-2 flex max-w-full items-center justify-center"
    >
      <motion.div
        onMouseMove={({ pageY }) => {
          isHovered.set(1);
          mouseX.set(pageY);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={cn(
          "absolute bottom-2 left-full top-1/2 -translate-y-1/2 transform flex items-center justify-center w-fit transition-all duration-300",
          multiBorder
            ? "rounded-md border border-zinc-200/80 dark:border-zinc-800/80 bg-[#151515] shadow-lg backdrop-blur-md lg:backdrop-blur-xl"
            : "",
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application Navbar"
      >
        <div
          className={cn(
            "flex flex-col items-center justify-center w-fit rounded-md px-4 py-2 h-full transition-all duration-300",
            gap,
            multiBorder
              ? "bg-[#151515] shadow-inner"
              : blurBackground
              ? "bg-white/10 dark:bg-black/20 backdrop-blur-md lg:backdrop-blur-xl border-2 border-white/20 dark:border-white/10 shadow-md"
              : "bg-background border-2 border-border shadow-md"
          )}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <NavbarItem
                icon={item.icon}
                label={item.label}
                onClick={item.onClick}
                mouseX={mouseX}
                baseItemSize={baseItemSize}
                magnification={magnification}
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
        </div>
      </motion.div>
    </motion.div>
  );
}

export { Navbar };

