"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineHeader {
  title: string;
  description: string;
}

export const Timeline = ({
  data,
  header,
}: {
  data: TimelineEntry[];
  header: TimelineHeader;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  // Highlight the row that overlaps a thin band near the sticky position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = rowRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (index !== -1) setActiveIndex(index);
          }
        }
      },
      // Band from 20% to 30% of the viewport height,
      // close to where the sticky titles stop (top-40 = 160px)
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-black font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 flex flex-col gap-4 items-end text-end">
        <h2 className="font-heading text-4xl font-medium text-white sm:text-5xl xl:text-6xl">
          {header.title}
        </h2>
        <p className="mt-4 max-w-xl font-body text-gray-400 text-base md:text-lg xl:text-xl">
          {header.description}
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border p-2 transition-colors duration-300",
                      isActive
                        ? "border-white bg-white"
                        : "border-neutral-700 bg-neutral-800",
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    "hidden md:block text-xl md:pl-20 md:text-5xl font-heading font-medium transition-colors duration-300",
                    isActive ? "text-white" : "text-neutral-600",
                  )}
                >
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3
                  className={cn(
                    "md:hidden block text-2xl mb-4 text-left font-bold transition-colors duration-300",
                    isActive ? "text-white" : "text-neutral-500",
                  )}
                >
                  {item.title}
                </h3>
                {item.content}
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            // className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full "
            className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full bg-white"
          />
        </div>
      </div>
    </div>
  );
};
