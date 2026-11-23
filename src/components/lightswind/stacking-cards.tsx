import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export interface StackingCardItem {
  id: number;
  title: string;
  brand: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  to?: string;
  disabled?: boolean;
}

interface StackingCardsProps {
  items: StackingCardItem[];
}

const learnMoreClass =
  "group text-gray-300 hover:text-blue-600 relative inline-flex items-center text-sm after:content-[\"\"] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-all after:duration-300 hover:after:w-full";

export function StackingCards({ items }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven depth effect (reversible: reads live getBoundingClientRect,
  // so it also un-stacks when scrolling back up).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-stack-card]")
    );
    let ticking = false;

    const update = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // 0 = entering from below, 1 = pinned at its top offset
        const progress = Math.min(Math.max((vh - rect.top) / (vh * 0.6), 0), 1);
        const scale = 1 - (1 - progress) * 0.05;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(0.6 + progress * 0.4);
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {items.map((item, index) => (
        <div
          key={item.id}
          data-stack-card
          className="sticky w-full max-w-3xl mb-10 origin-top will-change-transform"
          style={{
            top: "1rem",
            zIndex: index + 1,
          }}
        >
          <div className="flex flex-col h-[30rem] overflow-hidden rounded-2xl border border-[#ffffff4d] bg-[#151515] shadow-xl">
            <div
              className="relative h-56 shrink-0 w-full bg-black bg-cover bg-center"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            />
            <div className="p-6 flex-1 overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm font-medium mb-2">{item.brand}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-[#101010] text-[#f5f5f5] rounded-md text-xs outline outline-1 outline-blue-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {item.disabled ? (
                <div className="text-gray-500 flex items-center cursor-not-allowed">
                  <span className="text-gray-200 relative inline-block">Learn More</span>
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </div>
              ) : item.to ? (
                <Link to={item.to} className={learnMoreClass}>
                  Learn More
                  <ArrowUpRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={learnMoreClass}
                >
                  Learn More
                  <ArrowUpRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StackingCards;