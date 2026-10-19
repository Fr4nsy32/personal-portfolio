import { RouteNames } from "@/routes/route-names";
import demo1 from "@/assets/img/demo1.png";
import demo2 from "@/assets/img/demo2.png";
import type { Project, ProjectCategory } from "@/services/types";

import { TECH } from "./tech";

export const CATEGORIES: ProjectCategory[] = ["web", "mobile", "tools"];

export const PROJECTS: Project[] = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    category: "web",
    year: "2026",
    stack: [
      TECH.react,
      TECH.tailwind,
      TECH.typescript,
      TECH.motion,
      TECH.i18next,
    ],
    images: [demo1, demo2], // [portfolio1, portfolio2]
    repo: "https://github.com/your-username/portfolio",
    demo: "https://your-portfolio.dev",
  },
  {
    id: "recipe-app",
    title: "Recipe for all",
    category: "mobile",
    year: "2025",
    stack: [TECH.react, TECH.next, TECH.nest],
    images: [],
    repo: "https://github.com/your-username/recipe-app",
  },
  {
    id: "log-parser",
    title: "Better Logs",
    category: "web",
    year: "2025",
    stack: [TECH.react, TECH.next, TECH.nest, TECH.typescript, TECH.javascript],
    images: [],
    repo: "https://github.com/your-username/log-parser",
    demo: "https://log-parser.example.com",
  },
];

export const projectPath = (id: string) => `${RouteNames.PROJECTS}/${id}`;
