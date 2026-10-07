import { useTranslation } from "react-i18next";
import { motion, MotionConfig, type Variants } from "motion/react";
import TerminalCarousel from "./terminal-carousel";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pt-12 pb-8 sm:px-6 xl:flex-row-reverse xl:gap-16 xl:px-12 xl:pt-12">
        <motion.div
          className="flex min-w-0 flex-col items-center text-center xl:flex-[2] xl:items-start xl:text-left"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={item}
            className="font-heading text-4xl font-medium text-white sm:text-5xl xl:text-6xl"
          >
            {t("home.title")}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-gray-400 text-base md:text-lg xl:text-xl"
          >
            {t("home.description")}
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full min-w-0 max-w-2xl xl:max-w-none xl:flex-[3]"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
        >
          <TerminalCarousel />
        </motion.div>
      </div>
    </MotionConfig>
  );
};

export default HomePage;