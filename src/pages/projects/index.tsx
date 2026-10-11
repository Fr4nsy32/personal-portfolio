import { motion } from "motion/react";
import MotionHeader from "@/components/motion-header";
import { motionContainer } from "@/constants";

const ProjectsPage: React.FC = () => {
  return (
    <>
      <motion.div
        className="max-w-7xl mx-auto py-20 px-4 lg:px-8 xl:px-10 flex flex-col gap-4 items-end text-end"
        variants={motionContainer}
        initial="hidden"
        animate="visible"
      >
        <MotionHeader
          title={"Work In Progress..."}
          description={"Stay tuned to see all my projects!"}
        />
      </motion.div>
    </>
  );
};

export default ProjectsPage;
