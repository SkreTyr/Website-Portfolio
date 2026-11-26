// components/ThreeDCarousel.tsx
"use client";

import {
  useRef,
  useEffect,
  useState,
  TouchEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "./card";

export interface ThreeDCarouselItem {
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

interface ThreeDCarouselProps {
  items: ThreeDCarouselItem[];
  autoRotate?: boolean;
  rotateInterval?: number;
  cardHeight?: number;
  title?: string;
  subtitle?: string;
  tagline?: string;
  isMobileSwipe?: boolean;
}

const ThreeDCarousel = ({
  items = [
    {
      id: 1,
      title: "Active Wear Innovation",
      brand: "VEYNS",
      description: "Order your favorite meals directly from our kitchen for lower prices, exclusive deals, and fast local delivery.",
      tags: ["Sports", "Health", "IoT"],
      imageUrl: "https://images.unsplash.com/photo-1515243061678-14fc18b93935?q=70&w=1200&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 2,
      title: "Smart Ergonomics",
      brand: "Herman Miller",
      description: "Pressure-sensitive fabrics in office chairs that analyze posture and suggest adjustments for optimal health.",
      tags: ["Office", "Health", "Furniture"],
      imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=70&w=1200&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 3,
      title: "Automotive Comfort",
      brand: "Tesla",
      description: "Intelligent car seats that adapt to passenger position and monitor vital signs for enhanced safety.",
      tags: ["Auto", "Safety", "Smart"],
      imageUrl: "https://images.unsplash.com/photo-1561580125-028ce3bfcb25?q=70&w=1200&auto=format&fit=crop",
      link: "#",
    },
  ],
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 500,
}: ThreeDCarouselProps) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const didSwipeRef = useRef(false);
  const [canHover] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : true
  );
  const minSwipeDistance = 50;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (autoRotate && canHover && isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % items.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, items.length, canHover]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    didSwipeRef.current = false;
    touchStartRef.current = e.targetTouches[0].clientX;
    touchEndRef.current = null;
  };

  const onTouchMove = (e: TouchEvent) => {
    // ref, not state: touchmove fires ~60x/s during a scroll — a setState per
    // move would re-render the whole carousel and jank the scroll
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > minSwipeDistance) {
      didSwipeRef.current = true;
      setActive((prev) => (prev + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      didSwipeRef.current = true;
      setActive((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const openItem = (item: ThreeDCarouselItem) => {
    if (item.disabled) return;
    if (item.to) {
      navigate(item.to);
    } else if (item.link && item.link !== "#") {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  const getCardAnimationClass = (index: number) => {
    if (index === active) return "scale-100 z-20";
    if (index === (active + 1) % items.length)
      return "translate-x-[40%] scale-95 opacity-100 z-10";
    if (index === (active - 1 + items.length) % items.length)
      return "translate-x-[-40%] scale-95 opacity-100 z-10";
    return "scale-90 opacity-0";
  };

  return (
    <section
      id="ThreeDCarousel"
      className="bg-transparent min-w-full mx-aut 
    flex items-center justify-center"
    >
      <div
        className="w-full px-4 sm:px-6 lg:px-8 
      min-w-[320px] md:min-w-[1000px] max-w-7xl  "
      >
        <div
          className="relative overflow-hidden h-[550px] "
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
            {items.map((item, index) => (
              <div
                key={item.id}
                role={isMobile ? "button" : undefined}
                tabIndex={isMobile ? 0 : -1}
                onClick={() => {
                  if (!isMobile || didSwipeRef.current) return;
                  if (index === active) openItem(item);
                  else setActive(index);
                }}
                onKeyDown={(e) => {
                  if (!isMobile) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (index === active) openItem(item);
                    else setActive(index);
                  }
                }}
                className={`group cursor-pointer bg-[#151515] rounded-md absolute top-0 w-full max-w-md transform-gpu transition-[transform,opacity] duration-500 hover:-translate-y-1 ${
                  isMobile ? "cursor-pointer" : ""
                } ${getCardAnimationClass(index)}`}
              >
                <Card
                  className={`overflow-hidden bg-[#151515] h-[${cardHeight}px] rounded-md border border-[#ffffff4d] shadow-sm
                hover:shadow-md flex flex-col`}
                >
                  <div
                    className="keep-color relative bg-black p-6 flex items-center justify-center h-48 overflow-hidden"
                    style={{
                      backgroundImage: `url(${item.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
>

                   </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-1 text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mb-2">
                      {item.brand}
                    </p>
                    <p className="text-gray-600 text-sm flex-grow">
                      {item.description}
                    </p>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-[#101010] text-[#f5f5f5] rounded-md text-xs animate-pulse-slow outline outline-1 outline-blue-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {item.disabled ? (
                        <div className="text-gray-500 flex items-center relative cursor-not-allowed">
                          <span className='text-gray-200 relative inline-block'>Learn More</span>
                          <ArrowUpRight className="ml-2 w-4 h-4 relative z-10" />
                        </div>
                      ) : (
                        <span className="text-gray-300 group-hover:text-blue-600 flex items-center relative text-sm">
                          <span className='relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 group-hover:after:w-full'>Learn More</span>
                          <ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-blue-500'/>
                        </span>
                      )}
                    </div>
                  </CardContent>
                  {!item.disabled && (
                    <a
                      href={item.to ? undefined : item.link}
                      onClick={(e) => {
                        e.stopPropagation();
                        openItem(item);
                      }}
                      aria-label="Learn More"
                      className="hidden md:block absolute inset-0 z-20 rounded-md"
                    />
                  )}
                </Card>
              </div>
            ))}
          </div>

          <button
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-transform hover:scale-110"
            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-transform hover:scale-110"
            onClick={() => setActive((prev) => (prev + 1) % items.length)}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            <button
              className="hidden min-[325px]:flex max-[425px]:flex lg:hidden w-8 h-8 bg-white/80 rounded-full items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-transform hover:scale-110"
              onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-[width] duration-300 ${
                  active === idx
                    ? "bg-gray-500 w-5"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActive(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
            <button
              className="hidden min-[325px]:flex max-[425px]:flex lg:hidden w-8 h-8 bg-white/80 rounded-full items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-transform hover:scale-110"
              onClick={() => setActive((prev) => (prev + 1) % items.length)}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDCarousel;
