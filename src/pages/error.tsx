// pages/error/index.tsx
import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { motion } from "motion/react";
import MotionHeader from "@/components/motion-header";
import LottieButton from "@/components/lottie-button";
import { motionContainer, motionItem } from "@/lib/motion-variants";
import backHomeAnimation from "@/assets/lottie/home_animation.json";
import reloadAnimation from "@/assets/lottie/reload_animation.json";
import { useTranslation } from "react-i18next";

const ErrorPage: React.FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "error" });
  const stale_chunk_regex =
    /dynamically imported module|Importing a module script failed|Loading chunk/i;
  const error = useRouteError();
  const navigate = useNavigate();

  const isStaleChunk =
    error instanceof Error && stale_chunk_regex.test(error.message);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <motion.main
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className="flex min-h-[80dvh] flex-col items-center justify-center px-6 text-center"
    >
      <MotionHeader
        title={isStaleChunk ? t("stale.title") : t("wrong.title")}
        description={
          isStaleChunk ? t("stale.description") : t("wrong.description")
        }
      />

      {/* Show the real message only while developing */}
      {import.meta.env.DEV && error instanceof Error && (
        <motion.pre
          variants={motionItem}
          className="mt-6 max-w-xl overflow-x-auto rounded-lg bg-white/5 p-4 text-left text-xs text-red-400"
        >
          {error.message}
        </motion.pre>
      )}

      <motion.div variants={motionItem} className="mt-8">
        {isStaleChunk ? (
          <LottieButton
            text={t("stale.button")}
            animation={reloadAnimation}
            speed={3}
            onComplete={() => window.location.reload()}
          />
        ) : (
          <LottieButton
            text={t("wrong.button")}
            animation={backHomeAnimation}
            speed={4}
            onComplete={() => {
              navigate("/");
              window.location.reload();
            }}
          />
        )}
      </motion.div>
    </motion.main>
  );
};

export default ErrorPage;
