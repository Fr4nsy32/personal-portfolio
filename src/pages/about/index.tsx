import { motion } from "motion/react";
import TimelineAbout from "./timeline-about";
import MotionHeader from "@/components/motion-header";
import { useTranslation } from "react-i18next";
import { motionContainer } from "@/lib/motion-variants";

const AboutPage: React.FC = () => {
  const { t } = useTranslation("about");

  return (
    <>
      <motion.div
        className="max-w-7xl mx-auto py-20 px-4 lg:px-8 xl:px-10 flex flex-col gap-4 items-end text-end"
        variants={motionContainer}
        initial="hidden"
        animate="visible"
      >
        <MotionHeader
          title={t("header.title")}
          description={t("header.description")}
        />
      </motion.div>
      <TimelineAbout />;
    </>
  );
};

export default AboutPage;
