"use client";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
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

// Header: the container only sequences, the children define the movement
const headerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Rows: the left column (dot + title) slides in, then the content rises
const rowContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const rowTitle: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const rowContent: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

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
    <MotionConfig reducedMotion="user">
      <div className="w-full bg-transparent font-sans lg:px-10" ref={containerRef}>
        <motion.div
          className="max-w-7xl mx-auto py-20 px-4 lg:px-8 xl:px-10 flex flex-col gap-4 items-end text-end"
          variants={headerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={headerItem}
            className="font-heading text-4xl font-medium text-white sm:text-5xl xl:text-6xl"
          >
            {header.title}
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="mt-4 max-w-md lg:max-w-xl font-body text-gray-400 text-base md:text-lg xl:text-xl"
          >
            {header.description}
          </motion.p>
        </motion.div>

        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          {data.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                variants={rowContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="flex justify-start pt-10 lg:pt-40 lg:gap-10"
              >
                <motion.div
                  variants={rowTitle}
                  className="sticky flex flex-col lg:flex-row z-40 items-center top-40 self-start max-w-xs xl:max-w-sm lg:w-full"
                >
                  <div className="h-10 absolute left-3 w-10 rounded-full bg-black flex items-center justify-center">
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
                      "hidden lg:block text-xl lg:pl-20 lg:text-5xl font-heading font-medium transition-colors duration-300",
                      isActive ? "text-white" : "text-neutral-600",
                    )}
                  >
                    {item.title}
                  </h3>
                </motion.div>

                <motion.div
                  variants={rowContent}
                  className="relative pl-20 pr-4 xl:pl-4 w-full mb-10 lg:mb-0"
                >
                  <h3
                    className={cn(
                      "lg:hidden block text-2xl mb-4 text-left font-bold transition-colors duration-300",
                      isActive ? "text-white" : "text-neutral-500",
                    )}
                  >
                    {item.title}
                  </h3>
                  {item.content}
                </motion.div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              height: height + "px",
            }}
            className="absolute left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full bg-white"
            />
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
};