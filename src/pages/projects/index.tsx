import React from "react";
import { useTranslation } from "react-i18next";
import { motion, MotionConfig } from "motion/react";
import MotionHeader from "@/components/motion-header";
import { motionContainer, motionItem } from "@/constants";
import ProjectTree from "./project-tree";

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="mx-auto w-full max-w-4xl px-4 pt-12 pb-16 sm:px-6"
        variants={motionContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={motionContainer}
          className="mb-10 flex flex-col items-center text-center lg:mb-14"
        >
          <MotionHeader
            title={t("projects.header.title")}
            description={t("projects.header.description")}
            full
          />
        </motion.div>

        <motion.div variants={motionItem}>
          <ProjectTree />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

export default ProjectsPage;