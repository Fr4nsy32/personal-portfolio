import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { useTranslation } from "react-i18next";
import Background from "./timeline-steps/background";
import Education from "./timeline-steps/education";
import Experience from "./timeline-steps/experience";

const TimelineAbout: React.FC = () => {
  const { t } = useTranslation();

  const timelineData = [
    {
      title: t("about.timeline.steps.background"),
      content: <Background />,
    },
    {
      title: t("about.timeline.steps.education"),
      content: <Education />,
    },
    {
      title: t("about.timeline.steps.experience"),
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
