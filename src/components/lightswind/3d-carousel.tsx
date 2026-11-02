// components/ThreeDCarousel.tsx
"use client";

import {
  useRef,
  useEffect,
  useState,
  TouchEvent,
} from "react";
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
      imageUrl: "https://images.unsplash.com/photo-1515243061678-14fc18b93935?q=80&w=2940&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 2,
      title: "Smart Ergonomics",
      brand: "Herman Miller",
      description: "Pressure-sensitive fabrics in office chairs that analyze posture and suggest adjustments for optimal health.",
      tags: ["Office", "Health", "Furniture"],
      imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2938&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 3,
      title: "Automotive Comfort",
      brand: "Tesla",
      description: "Intelligent car seats that adapt to passenger position and monitor vital signs for enhanced safety.",
      tags: ["Auto", "Safety", "Smart"],
      imageUrl: "https://images.unsplash.com/photo-1561580125-028ce3bfcb25?q=80&w=2940&auto=format&fit=crop",
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (autoRotate && isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % items.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + items.length) % items.length);
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
                className={`bg-[#151515] rounded-xl absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(
                  index
                )}`}
              >
                <Card
                  className={`overflow-hidden bg-[#151515] h-[${cardHeight}px] border shadow-sm 
                hover:shadow-md flex flex-col`}
                >
                  <div
                    className="relative bg-black p-6 flex items-center justify-center h-48 overflow-hidden"
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

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 flex items-center relative group"
                        onClick={() => {
                          if (item.link.startsWith("/")) {
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
              <span className='text-gray-200 hover:text-blue-400 relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-0 after:bg-blue-200 after:transition-all after:duration-300 hover:after:w-full'>Learn More</span> 
                        <ArrowUpRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500" />

                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <button
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
            onClick={() => setActive((prev) => (prev + 1) % items.length)}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            <button
              className="hidden min-[325px]:flex max-[425px]:flex lg:hidden w-8 h-8 bg-white/80 rounded-full items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
              onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === idx
                    ? "bg-gray-500 w-5"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActive(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
            <button
              className="hidden min-[325px]:flex max-[425px]:flex lg:hidden w-8 h-8 bg-white/80 rounded-full items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all hover:scale-110"
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
