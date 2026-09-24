import { Lottie } from "lottie-react";
import downloadAnimation from "../assets/lottie/downloadAnimation.json";
import cv_eng from "../assets/curriculum/Andi_Sina_CV_Eng.pdf";
import { useState } from "react";

const DownloadResumeButton: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (isDownloading) return;

    setIsDownloading(true);

    setTimeout(() => {
      const link = document.createElement("a");
      link.href = cv_eng;
      link.download = "Andi_Sina_CV_Eng.pdf";
      link.click();

      setIsDownloading(false);
    }, 4000);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
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
        md:mb-0
        rounded-full
        text-sm
        font-medium
        shadow-[0px_0px_10px_5px]
        shadow-white/50
        md:hover:shadow-[0px_0px_20px_10px]
        hover:shadow-white/50
        hover:bg-slate-100
        transition
        duration-300
      "
    >
      <span>Curriculum</span>

      <Lottie
        src={downloadAnimation}
        autoplay={isDownloading}
        loop={1}
        speed={0.7}
        className="w-7 h-7 shrink-0"
        style={{
          transform: "scale(0.8)",
        }}
      />
    </button>
  );
};

export default DownloadResumeButton;
