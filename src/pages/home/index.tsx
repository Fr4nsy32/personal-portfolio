import { useTranslation } from "react-i18next";
import TerminalCarousel from "./terminal-carousel";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pt-12 pb-8 sm:px-6 xl:flex-row-reverse xl:gap-16 xl:px-12 xl:pt-12">
      <div className="flex min-w-0 flex-col items-center text-center xl:flex-[2] xl:items-start xl:text-left">
        <h1 className="font-heading text-4xl font-medium text-white sm:text-5xl xl:text-6xl ">
          {t("home.title")}
        </h1>
        <p className="mt-4 max-w-xl text-gray-400 text-base md:text-lg xl:text-xl">
          {t("home.description")}
        </p>
      </div>

      <div className="w-full min-w-0 max-w-2xl xl:max-w-none xl:flex-[3]">
        <TerminalCarousel />
      </div>
    </div>
  );
};

export default HomePage;
