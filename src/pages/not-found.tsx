// pages/not-found/index.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import MotionHeader from "@/components/motion-header";
import LottieButton from "@/components/lottie-button";
import { motionContainer, motionItem } from "@/lib/motion-variants";
import backHomeAnimation from "@/assets/lottie/home_animation.json";
import { useTranslation } from "react-i18next";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "not-found" });
  const navigate = useNavigate();

  return (
    <motion.main
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className="flex min-h-[50dvh] flex-col items-center justify-center px-6 text-center"
    >
      <meta name="robots" content="noindex" />
      <MotionHeader title="404" description={t("description")} />
      <motion.div variants={motionItem} className="mt-8">
        <LottieButton
          text={t("button")}
          animation={backHomeAnimation}
          onComplete={() => navigate("/")}
          speed={4}
        />
      </motion.div>
    </motion.main>
  );
};

export default NotFoundPage;
