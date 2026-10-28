import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { useTranslation } from "react-i18next";
import Background from "./sections/background";
import Education from "./sections/education";
import Experience from "./sections/experience";

const TimelineAbout: React.FC = () => {
  const { t } = useTranslation("about");

  const timelineData = [
    {
      title: t("timeline.steps.background"),
      content: <Background />,
    },
    {
      title: t("timeline.steps.education"),
      content: <Education />,
    },
    {
      title: t("timeline.steps.experience"),
      content: <Experience />,
    },
  ];
  return (
    <div className="w-full overflow-clip">
      <Timeline data={timelineData} />
    </div>
  );
};

export default TimelineAbout;
