import { RouteNames } from "@/routes/route-names";
// import demo_1 from "@/assets/img/demo_1.png";
// import demo_2 from "@/assets/img/demo_2.png";
import homepage from "@/assets/img/personal-portfolio/homepage.png";
import about from "@/assets/img/personal-portfolio/about.png";
import projects from "@/assets/img/personal-portfolio/projects.png";
import contact from "@/assets/img/personal-portfolio/contact.png";
import type { Project, ProjectCategory } from "@/types";
import { TECH } from "./tech";

export const CATEGORIES: ProjectCategory[] = ["web", "mobile", "tools"];

const GITHUB_USER = import.meta.env.VITE_GITHUB_USER;
const githubRepo = (name: string) =>
  `https://github.com/${GITHUB_USER}/${name}`;

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
    images: [homepage, about, projects, contact],
    repo: githubRepo("personal-portfolio"),
    demo: "https://your-portfolio.dev",
  },
  // {
  //   id: "recipe-app",
  //   title: "Recipe for all",
  //   category: "mobile",
  //   year: "2025",
  //   stack: [TECH.react, TECH.next, TECH.nest],
  //   images: [],
  //   repo: githubRepo("recipe-app"),
  // },
  // {
  //   id: "log-parser",
  //   title: "Better Logs",
  //   category: "web",
  //   year: "2025",
  //   stack: [TECH.react, TECH.next, TECH.nest, TECH.typescript, TECH.javascript],
  //   images: [],
  //   repo: githubRepo("log-parser"),
  //   demo: "https://log-parser.example.com",
  // },
];

export const projectPath = (id: string) => `${RouteNames.PROJECTS}/${id}`;
