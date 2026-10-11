import { useTranslation } from "react-i18next";
import { motion, MotionConfig } from "motion/react";
import TerminalCarousel from "./terminal-carousel";
import MotionHeader from "@/components/motion-header";
import { motionContainer } from "@/constants";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pt-12 pb-8 sm:px-6 xl:flex-row-reverse xl:gap-16 xl:px-12 xl:pt-12">
        <motion.div
          className="flex min-w-0 flex-col items-center text-center xl:flex-[2] xl:items-start xl:text-left"
          variants={motionContainer}
          initial="hidden"
          animate="visible"
        >
          <MotionHeader
            title={t("home.title")}
            description={t("home.description")}
          />
        </motion.div>
        <motion.div
          className="w-full min-w-0 max-w-2xl xl:max-w-none xl:flex-[3]"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <TerminalCarousel />
        </motion.div>
      </div>
    </MotionConfig>
  );
};

export default HomePage;
