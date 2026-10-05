import { LottieDisplay, useLottie } from "lottie-react";
import downloadAnimation from "@/assets/lottie/downloadAnimation.json";
import cv_eng from "@/assets/cv/Andi_Sina_CV_Eng.pdf";

const DownloadResumeButton: React.FC = () => {
  const lottie = useLottie({
    src: downloadAnimation,
    loop: false,
    speed: 2,
    subscriptions: {
      complete: () => {
        const link = document.createElement("a");
        link.href = cv_eng;
        link.download =
          document.documentElement.lang == "en"
            ? "Andi_Sina_CV_Eng.pdf"
            : "Andi_Sina_CV_Ita.pdf";
        link.click();
      },
      error: ({ error }) => console.error(error),
    },
  });

  return (
    <button
      type="button"
      onClick={() => lottie.play()}
      className="
        inline-flex
        cursor-pointer
        items-center
        justify-center
        gap-1.5
        bg-white
        text-black
        px-4
        py-2
        mb-3
        sm:mb-0
        rounded-full
        text-sm
        font-heading
        font-medium
        shadow-[0px_0px_15px_8px]
        shadow-white/20
        md:hover:shadow-[0px_0px_20px_10px]
        hover:shadow-white/20
        hover:bg-slate-100
        transition
        duration-300
      "
    >
      <span>CV</span>
      <LottieDisplay lottie={lottie} className="w-5 h-5" />
    </button>
  );
};

export default DownloadResumeButton;
