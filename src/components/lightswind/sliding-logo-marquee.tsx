"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
// Import your actual utility
import { cn } from "@/lib/utils"; // Assuming this is your actual path
import { Pause, Play } from "lucide-react";

const GLIDE_TAU = 1.8;
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
  const drag = useRef({ active: false, startX: 0, startTx: 0, width: 1, moved: false });
  const movedRef = useRef(false);
  const samples = useRef<[number, number][]>([]);
  const rafRef = useRef(0);
  const glideRaf = useRef(0);
  const rateRef = useRef(1);

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    cancelAnimationFrame(glideRaf.current);
  }, []);

  // Match LogoLoop speed (px/s): set the CSS duration from the measured copy width.
  useEffect(() => {
    const measure = () => {
      const el = listRef.current;
      const c = containerRef.current;
      if (!el || !c) return;
      const w = el.scrollWidth / 2;
      if (w > 0) c.style.setProperty('--duration', `${w / (speed || 1)}s`);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [speed, items]);

  // CORE FIX: Duplicating the items for a seamless loop
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

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

  const currentTx = () => {
    const el = listRef.current;
    if (!el) return 0;
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return m.m41;
  };

  const setRate = (r: number) => {
    rateRef.current = r;
    listRef.current?.getAnimations().forEach((a) => a.updatePlaybackRate(r));
  };

  // Smoothly ramp the marquee speed (used for the hover stop/start).
  const rampTo = (target: number, dur = 600) => {
    cancelAnimationFrame(rafRef.current);
    const from = rateRef.current;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setRate(from + (target - from) * e);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setRate(target);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const handoff = (el: HTMLUListElement, w: number, tx: number) => {
    const progress = ((-tx / w) % 1 + 1) % 1;
    const D = w / (speed || 1);
    // Restore the CSS animation first, THEN apply the negative delay. Setting the
    // `animation` shorthand afterwards would reset the delay and snap to the start.
    el.style.animation = '';
    el.style.transform = '';
    el.style.animationDelay = `${-progress * D}s`;
    setRate(1);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!draggable || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const el = listRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    cancelAnimationFrame(glideRaf.current);
    const startTx = currentTx();
    drag.current = {
      active: true,
      startX: e.clientX,
      startTx,
      width: el.scrollWidth / 2 || 1,
      moved: false,
    };
    movedRef.current = false;
    samples.current = [[performance.now(), e.clientX]];
    // Fully disable the CSS animation so the inline transform actually applies
    // (a paused animation still overrides inline transforms).
    el.style.animation = 'none';
    el.style.transform = `translateX(${startTx}px)`;
    setRate(0);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 3) {
      d.moved = true;
      movedRef.current = true;
    }
    const now = performance.now();
    samples.current.push([now, e.clientX]);
    while (samples.current.length > 2 && now - samples.current[0][0] > 100) samples.current.shift();
    const el = listRef.current;
    if (!el) return;
    const w = d.width || 1;
    let tx = d.startTx + dx;
    tx = ((tx % w) + w) % w;
    if (tx > 0) tx -= w;
    el.style.transform = `translateX(${tx}px)`;
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
    const el = listRef.current;
    if (!el) return;
    const w = d.width || 1;

    let v = 0;
    const s = samples.current;
    const now = performance.now();
    if (s.length > 1) {
      const [t0, x0] = s[0];
      const [t1, x1] = s[s.length - 1];
      if (t1 > t0 && now - t1 < 80) v = (x1 - x0) / (t1 - t0);
    }

    if (!d.moved || Math.abs(v) < 0.02) {
      handoff(el, w, currentTx());
      return;
    }

    // Inertial glide (LogoLoop-style): continue from the exact release point with
    // the release velocity, decaying smoothly, then hand off to the CSS loop.
    let tx = currentTx();
    let vel = Math.max(-MAX_FLING, Math.min(MAX_FLING, v * 1000));
    let last = performance.now();
    const start = last;
    const glide = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      tx += vel * dt;
      vel *= Math.exp(-dt / GLIDE_TAU);
      tx = ((tx % w) + w) % w;
      if (tx > 0) tx -= w;
      el.style.transform = `translateX(${tx}px)`;
      if (Math.abs(vel) > 6 && t - start < 2600) {
        glideRaf.current = requestAnimationFrame(glide);
      } else {
        handoff(el, w, tx);
      }
    };
    glideRaf.current = requestAnimationFrame(glide);
  };

  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch' && pauseOnHover && !drag.current.active) rampTo(0);
  };
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'touch' && pauseOnHover && !drag.current.active) rampTo(1);
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