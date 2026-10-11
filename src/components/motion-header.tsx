import { motionItem } from "@/constants";
import { cn } from "cn";
import { motion } from "motion/react";

const MotionHeader: React.FC<{
  title: string;
  description: string;
  full?: boolean;
}> = ({ title, description, full }) => {
  return (
    <>
      <motion.h1
        variants={motionItem}
        className="font-heading text-4xl font-medium text-white sm:text-5xl xl:text-6xl"
      >
        {title}
      </motion.h1>
      <motion.p
        variants={motionItem}
        className={cn(
          "mt-4  text-gray-400 text-base md:text-lg xl:text-xl",
          full ? "max-w-full" : "max-w-xl",
        )}
      >
        {description}
      </motion.p>
    </>
  );
};

export default MotionHeader;
