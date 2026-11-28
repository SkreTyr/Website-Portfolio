"use client";

import React, { useRef, useState, useEffect } from "react";
// Import your actual utility
import { cn } from "@/lib/utils"; // Assuming this is your actual path
import { Pause, Play } from "lucide-react";

const MAX_FLING = 4000;

// --- Interfaces (Kept for completeness) ---
export interface SlidingLogoMarqueeItem {
  id: string;
  content: React.ReactNode;
  href?: string;
}

export interface SlidingLogoMarqueeProps {
  items: SlidingLogoMarqueeItem[];
  speed?: number;
  pauseOnHover?: boolean;
  enableBlur?: boolean;
  blurIntensity?: number;
  height?: string;
  width?: string;
  gap?: string;
  scale?: number;
  direction?: "horizontal" | "vertical";
  autoPlay?: boolean;
  backgroundColor?: string;
  showGridBackground?: boolean;
  className?: string;
  onItemClick?: (item: SlidingLogoMarqueeItem) => void;
  enableSpillEffect?: boolean;
  animationSteps?: number;
  showControls?: boolean;
  reverse?: boolean;
  draggable?: boolean;
  clickable?: boolean;
}

export function SlidingLogoMarquee({
  items,
  speed = 1,
  pauseOnHover = true,
  enableBlur = true,
  blurIntensity = 1,
  height = "100px",
  width = "100%",
  gap = "2rem",
  scale = 1,
  direction = "horizontal",
  autoPlay = true,
  backgroundColor = '!transparent',
  showGridBackground = false,
  className,
  onItemClick,
  enableSpillEffect = false,
  animationSteps = 8,
  showControls = true,
  reverse = false,
  draggable = false,
  clickable = true,
}: SlidingLogoMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const movedRef = useRef(false);
  const samples = useRef<[number, number][]>([]);
  const rafRef = useRef(0);
  const offsetRef = useRef(0);
  const velRef = useRef(0);
  const targetRef = useRef(0);
  const baseRef = useRef(0);
  const widthRef = useRef(1);
  const draggingRef = useRef(false);
  const pendingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const lastRef = useRef(0);

  // Base auto-scroll speed (px/s), signed by direction.
  useEffect(() => {
    baseRef.current = (reverse ? 1 : -1) * (speed || 1);
    targetRef.current = baseRef.current;
  }, [speed, reverse]);

  // Measure the exact seamless loop period and disable the CSS animation (we drive
  // it via rAF). The period is the distance from copy 1's first item to copy 2's
  // first item (copyWidth + N*gap) — using offsetWidth/2 is short by half a gap,
  // which caused the ~1cm jump at the loop reset.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.style.animation = 'none';
    const measure = () => {
      const lis = el.children;
      const n = Math.floor(lis.length / 2);
      let w = el.offsetWidth / 2;
      if (n > 0 && lis.length >= 2) {
        const a = (lis[0] as HTMLElement).offsetLeft;
        const b = (lis[n] as HTMLElement).offsetLeft;
        if (b > a) w = b - a;
      }
      if (w > 0) widthRef.current = w;
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [items]);

  // Single rAF engine: eases velocity toward the target, then applies the transform.
  // No handoff to a CSS animation, so there is never a snap/jump.
  useEffect(() => {
    const tick = (now: number) => {
      const dt = lastRef.current ? Math.min(0.05, (now - lastRef.current) / 1000) : 0;
      lastRef.current = now;
      const el = listRef.current;
      if (el) {
        if (!draggingRef.current) {
          const target = targetRef.current;
          velRef.current += (target - velRef.current) * (1 - Math.exp(-dt / 0.25));
          if (Math.abs(velRef.current - target) < 0.5) velRef.current = target;
          offsetRef.current += velRef.current * dt;
        }
        const w = widthRef.current || 1;
        let tx = offsetRef.current % w;
        if (tx > 0) tx -= w;
        offsetRef.current = tx;
        el.style.transform = `translateX(${tx}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleItemClick = (item: SlidingLogoMarqueeItem) => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
    onItemClick?.(item);
  };

  const togglePlayState = () => {
    setIsPlaying(!isPlaying);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!draggable || (e.pointerType === 'mouse' && e.button !== 0)) return;
    pendingRef.current = true;
    draggingRef.current = false;
    startXRef.current = e.clientX;
    samples.current = [[performance.now(), e.clientX]];
    movedRef.current = false;
    // Ease the auto-scroll to a smooth stop as the grab begins.
    targetRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pendingRef.current && !draggingRef.current) return;
    const el = listRef.current;
    if (!el) return;
    const dx = e.clientX - startXRef.current;
    if (!draggingRef.current) {
      draggingRef.current = true;
      startOffsetRef.current = offsetRef.current;
    }
    if (Math.abs(dx) > 3) movedRef.current = true;
    const now = performance.now();
    samples.current.push([now, e.clientX]);
    while (samples.current.length > 2 && now - samples.current[0][0] > 100) samples.current.shift();
    const w = widthRef.current || 1;
    let tx = startOffsetRef.current + dx;
    tx = ((tx % w) + w) % w;
    if (tx > 0) tx -= w;
    offsetRef.current = tx;
    el.style.transform = `translateX(${tx}px)`;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!pendingRef.current && !draggingRef.current) return;
    pendingRef.current = false;
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
    let v = 0;
    const s = samples.current;
    const now = performance.now();
    if (s.length > 1) {
      const [t0, x0] = s[0];
      const [t1, x1] = s[s.length - 1];
      if (t1 > t0 && now - t1 < 80) v = (x1 - x0) / (t1 - t0);
    }
    // Release velocity becomes the new velocity; the engine eases it back to the
    // base speed smoothly (fast fling -> gradual slow-down, no jump).
    velRef.current = Math.max(-MAX_FLING, Math.min(MAX_FLING, v * 1000));
    targetRef.current = baseRef.current;
  };

  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch' && pauseOnHover && !draggingRef.current) targetRef.current = 0;
  };
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch' && pauseOnHover && !draggingRef.current) targetRef.current = baseRef.current;
  };

  const blurDivs = Array.from({ length: animationSteps }, (_, index) => (
    <div key={index} style={{ "--index": index } as React.CSSProperties} className="absolute inset-0 z-[var(--index)]" />
  ));

  const itemRenderer = (item: SlidingLogoMarqueeItem, index: number, isDuplicate: boolean) => (
    <li
      // Use original ID plus index/flag for unique keys
      key={`${item.id}-${index}-${isDuplicate ? 'dup' : 'orig'}`}
      className={cn(
        "sliding-marquee-item text-foreground select-none",
        "grid place-items-center transition-transform duration-300 ease-out hover:scale-[1.2]",
        clickable
          ? "cursor-pointer focus:scale-[1.2] focus:outline-none focus:ring-2 focus:ring-primary"
          : "cursor-inherit",
      )}
      onClick={clickable ? () => handleItemClick(item) : undefined}
      onDragStart={(e) => e.preventDefault()}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleItemClick(item);
              }
            }
          : undefined
      }
    >
      <div className="h-full w-auto">{item.content}</div>
    </li>
  );

  return (
    <>
      <style>
        {`
        .sliding-marquee-container {
          --speed: ${speed};
          --gap: ${gap};
          --blur: ${blurIntensity};
          --blurs: ${animationSteps};
          /* Dynamic Duration: Higher speed (e.g., 60) results in a shorter duration */
          /* Use a large fixed distance (e.g., 200vw) divided by speed to control rate */
          --duration: calc(200s / var(--speed)); 
        }

        /* ------------------------------------------------ */
        /* --- CORE INFINITE LOOP FIX: Animating by -50% -- */
        /* ------------------------------------------------ */
        @keyframes marquee-horizontal {
          /* Translates the doubled content by exactly half its length to loop seamlessly */
          from { transform: translateX(0); }
          to { transform: translateX(-50%); } 
        }
        
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }

        .sliding-marquee-list {
          display: flex;
          flex-shrink: 0; 
          min-width: 200%;
          gap: var(--gap);
          height: 100%;
          align-items: center;
          list-style-type: none;
          padding-inline: 0;
          margin: 0;
          pointer-events: auto;
          touch-action: pan-y;
          animation: marquee-horizontal var(--duration) linear infinite paused;
          transform: translateZ(0); /* Add this for mobile GPU layer */
          will-change: transform;    /* Hint browser to optimize for animation */
        }

        /* Conditional Animation based on Direction */
        .sliding-marquee-resizable[data-direction="vertical"] .sliding-marquee-list {
            flex-direction: column;
            min-width: unset;
            min-height: 200%;
            width: 100%;
            animation: marquee-vertical var(--duration) linear infinite paused;
        }


        .sliding-marquee-item {
          /* Match the previous LogoLoop sizing: 40px tall logos, auto width */
          min-width: auto; 
          height: 40px;
          font-size: clamp(1rem, 1vw + 0.5rem, 2rem);
        }
        .sliding-marquee-item img {
          -webkit-user-drag: none;
          user-select: none;
        }
        
        /* Play State Controls */
        [data-play-state="running"] .sliding-marquee-list {
          animation-play-state: running !important;
        }
        [data-play-state="paused"] .sliding-marquee-list {
          animation-play-state: paused !important;
        }
        [data-reverse="true"] .sliding-marquee-list {
          animation-direction: reverse;
        }

        /* --- Layout & Effects (Tailwind-Ready/Hybrid) --- */
        .sliding-marquee-resizable {
          overflow: hidden;
          scale: var(--scale);
          width: 100%;
          height: ${height};
          position: relative;
        }

        .sliding-marquee-inner {
          height: 100%;
          width: 100%;
          position: relative;
          mask: linear-gradient(90deg, transparent, black 15% 85%, transparent);
          display: flex; 
          pointer-events: none;
        }

        /* The rest of the blur and spill effect CSS... */
        .sliding-marquee-blur { position: absolute; top: 0; bottom: 0; width: 25%; z-index: 2; pointer-events: none; }
        .sliding-marquee-blur--right { right: 0; }
        .sliding-marquee-blur--left { left: 0; rotate: 180deg; }
        .sliding-marquee-blur div {
            mask: linear-gradient(90deg,
                transparent calc(var(--index) * calc((100 / var(--blurs)) * 1%)),
                black calc((var(--index) + 1) * calc((100 / var(--blurs)) * 1%)),
                black calc((var(--index) + 2) * calc((100 / var(--blurs)) * 1%)),
                transparent calc((var(--index) + 3) * calc((100 / var(--blurs)) * 1%)));
            backdrop-filter: blur(calc((var(--index, 0) * var(--blur, 0)) * 1px));
        }
        .sliding-marquee-resizable[data-spill="true"] { container-type: size; }
        .sliding-marquee-resizable[data-spill="true"] .sliding-marquee-inner::after {
            content: ""; position: fixed; top: 50%; left: 50%; width: calc(var(--scale) * 10000vw); height: calc(var(--scale) * 10000vh);
            pointer-events: none; translate: -50% -50%;
            mask: linear-gradient(white, white) 50% 50% / 100% 100% no-repeat, linear-gradient(white, white) 50% 50% / 100cqi 100cqh no-repeat;
            mask-composite: exclude;
        }
        `}
      </style>

      <div
        ref={containerRef}
        className={cn("sliding-marquee-container relative select-none", className)}
        style={{ width, background: backgroundColor, scale: scale, cursor: draggable ? 'grab' : undefined }}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
      >
        {showGridBackground && (
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="h-full w-full bg-[radial-gradient(#4b5563_1px,transparent_1px)]
             [background-size:16px_16px]"/>
          </div>
        )}

        <div
          className="sliding-marquee-resizable"
          data-direction={direction}
          data-blurring={enableBlur}
          data-play-state={isPlaying ? "running" : "paused"}
          data-spill={enableSpillEffect}
          data-reverse={reverse}
        >
          <div className="sliding-marquee-inner">
            {enableBlur && (
              <div className="sliding-marquee-blur sliding-marquee-blur--left">
                {blurDivs}
              </div>
            )}

            {/* Rendered Items: Original Set + Duplicate Set */}
            <ul ref={listRef} className="sliding-marquee-list text-foreground" aria-hidden={false}>
              {items.map((item, index) => itemRenderer(item, index, false))}

              {/* Duplicate is key to the seamless loop */}
              {items.map((item, index) => itemRenderer(item, index, true))}
            </ul>

            {enableBlur && (
              <div className="sliding-marquee-blur sliding-marquee-blur--right">
                {blurDivs}
              </div>
            )}
          </div>
        </div>

        {showControls && (
          <button
            onClick={togglePlayState}
            className={cn(
              "absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 text-xs",
              "bg-gray-800/50 text-white",
              "rounded-full hover:bg-gray-700/70 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary"
            )}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        )}
      </div>
    </>
  );
}

export default SlidingLogoMarquee;