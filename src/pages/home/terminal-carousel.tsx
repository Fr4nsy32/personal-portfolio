import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Terminal, type TerminalProps } from "@/components/ui/terminal";
import { GITHUB_USER, projects, type Project } from "@/utils/projects";

interface Slide {
  commands: string[];
  outputs: NonNullable<TerminalProps["outputs"]>;
}

const PAUSE_AFTER_DONE = 10000;

const buildSlide = (p: Project): Slide => {
  const url = `https://github.com/${GITHUB_USER}/${p.repo}`;
  return {
    commands: [`git clone ${url}.git`, "cat README.md"],
    outputs: {
      0: [`Cloning into '${p.repo}'...`, "Receiving objects: 100%, done."],
      1: [
        `# ${p.title}`,
        p.description,
        `Stack: ${p.stack.join(" · ")}`,
        ...(p.demoUrl ? [`Live: ${p.demoUrl}`] : []),
        `Case study: /projects/${p.slug}`,
      ],
    },
  };
};

const slides = projects.slice(0, 3).map(buildSlide);

const TerminalCarousel: React.FC = () => {
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

    const timer = setTimeout(() => api.scrollNext(), PAUSE_AFTER_DONE);
    return () => clearTimeout(timer);
  }, [api, completed, paused]);

  return (
    <section className="w-full mt-2 xl:py-20">
      <p className="mb-6 text-center font-heading text-sm uppercase tracking-widest text-neutral-400">
        Selected projects
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
