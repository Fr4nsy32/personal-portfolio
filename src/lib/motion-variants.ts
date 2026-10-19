import type { Variants } from "motion/react";

export const motionContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delay: 0.1 } },
};

export const motionItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
