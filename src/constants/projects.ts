import { RouteNames } from "@/routes/route-names";
import demo1 from "@/assets/img/demo1.png";
import demo2 from "@/assets/img/demo2.png";

/**
 * Only non-translatable data lives here.
 * All copy (title, tagline, about, highlights) is in i18n under
 * `projects.items.<id>.*`, so `id` is both the URL slug and the i18n key.
 */
export type ProjectCategory = "web" | "mobile" | "tools";

export interface Project {
  id: string;
  category: ProjectCategory;
  name: string;
  year: string;
  stack: string[];
  /** Screenshots, first one is shown by default. An empty array shows a placeholder. */
  images: string[];
  repo?: string;
  demo?: string;
}

/** Order here = order of the groups in the tree. */
export const CATEGORIES: ProjectCategory[] = ["web", "mobile", "tools"];

// Example of how to add screenshots:
// import portfolio1 from "@/assets/projects/portfolio/1.webp";
// import portfolio2 from "@/assets/projects/portfolio/2.webp";

export const PROJECTS: Project[] = [
  {
    id: "portfolio",
    name: "Personal Portfolio",
    category: "web",
    year: "2026",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion"],
    images: [demo1, demo2], // [portfolio1, portfolio2]
    repo: "https://github.com/your-username/portfolio",
    demo: "https://your-portfolio.dev",
  },
  // {
  //   id: "recipe-app",
  //   name: "Recipe for all",
  //   category: "mobile",
  //   year: "2025",
  //   stack: ["React Native", "Expo", "Firebase"],
  //   images: [],
  //   repo: "https://github.com/your-username/recipe-app",
  // },
  // {
  //   id: "log-parser",
  //   name: "Better Logs",
  //   category: "web",
  //   year: "2025",
  //   stack: ["Node.js", "TypeScript"],
  //   images: [],
  //   repo: "https://github.com/your-username/log-parser",
  //   demo: "https://log-parser.example.com",
  // },
];

export const projectPath = (id: string) => `${RouteNames.PROJECTS}/${id}`;
