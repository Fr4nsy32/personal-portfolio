import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { useTranslation } from "react-i18next";
import Background from "./timeline-steps/background";
import Education from "./timeline-steps/education";
// import Skills from "./timeline-steps/skills";
import TechExperience from "./timeline-steps/tech-experience";

const TimelineAbout: React.FC = () => {
  const { t } = useTranslation();

  const headerData = {
    title: t("about.header.title"),
    description: t("about.header.description"),
  };

  const timelineData = [
    {
      title: "Background",
      content: <Background />,
    },
    {
      title: "Education",
      content: <Education />,
    },
    {
      title: "Experience",
      content: <TechExperience />,
    },
    // {
    //   title: "Skills",
    //   content: <Skills />,
    // },
  ];
  return (
    <div className="w-full overflow-clip">
      <Timeline data={timelineData} header={headerData} />
    </div>
  );
};

export default TimelineAbout;
