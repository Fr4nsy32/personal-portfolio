/* eslint-disable react-hooks/purity */
import { useEffect, useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Terminal, type TerminalProps } from "@/components/ui/terminal";
import type { Project } from "@/services/types";
import { useTranslation } from "react-i18next";
import { PROJECTS } from "@/constants";

interface Slide {
  commands: string[];
  outputs: NonNullable<TerminalProps["outputs"]>;
}

const TerminalCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCompleted(false);
    };
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Once the terminal has finished typing, wait, then go to the next slide
  useEffect(() => {
    if (!api || !completed || paused) return;

    const timer = setTimeout(() => api.scrollNext(), 10000);
    return () => clearTimeout(timer);
  }, [api, completed, paused]);

  const buildSlide = (p: Project): Slide => {
    return {
      commands: [`git clone ${p.repo}.git`, "cat README.md"],
      outputs: {
        0: [`Cloning into '${p.id}'...`, "Receiving objects: 100%, done."],
        1: [
          `# ${p.title}`,
          t(`projects.items.${p.id}.tagline`),
          `Stack: ${p.stack.map((tech) => tech.name).join(" · ")}`,
          ...(p.demo ? [`Live: ${p.demo}`] : []),
          `Case study: /projects/${p.id}`,
        ],
      },
    };
  };

  const slides = useMemo(() => {
    const count = Math.floor(Math.random() * 3) + 1; // 1 to 3
    return [...PROJECTS]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(buildSlide);
  }, []);

  return (
    <section className="w-full mt-2 xl:py-20">
      <p className="mb-6 text-center font-heading text-sm uppercase tracking-widest text-white">
        {t("home.terminal-header")}
      </p>

      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="mx-auto w-full max-w-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="h-full">
              {current === i && (
                <Terminal
                  commands={slide.commands}
                  outputs={slide.outputs}
                  typingSpeed={45}
                  delayBetweenCommands={800}
                  enableSound={false}
                  onComplete={() => setCompleted(true)}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default TerminalCarousel;
