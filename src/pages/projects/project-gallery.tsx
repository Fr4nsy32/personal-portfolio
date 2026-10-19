import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

/** Render with `key={project.id}` so the selection resets between projects. */
const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title }) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-neutral-800 text-sm text-neutral-500 bg-black">
        {t("projects.detail.noPreview")}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${title} (${index + 1}/${images.length})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <ul
          className="flex gap-3 overflow-x-auto p-1"
          aria-label={t("projects.detail.gallery")}
        >
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={t("projects.detail.showImage", { number: i + 1 })}
                className={cn(
                  "block h-16 w-28 overflow-hidden rounded-lg border bg-neutral-950 outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                  i === index
                    ? "border-white drop-shadow-border-glow"
                    : "border-neutral-800 opacity-60 hover:opacity-100",
                )}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover object-top"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectGallery;
