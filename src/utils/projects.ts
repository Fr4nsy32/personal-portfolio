export interface Project {
  slug: string;
  title: string;
  repo: string;
  description: string;
  stack: string[];
  demoUrl?: string;
}

export const GITHUB_USER = "Fr4nsy32";

export const projects: Project[] = [
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    repo: "personal-portfolio",
    description: "A one-line description of what it does.",
    stack: ["React", "Node", "PostgreSQL"],
    demoUrl: "https://personal-portfolio.example.com",
  },
  {
    slug: "project-two",
    title: "Project Two",
    repo: "project-two",
    description: "A two-line description of what it does.",
    stack: ["React", "Node", "PostgreSQL"],
    demoUrl: "https://project-two.example.com",
  },
  {
    slug: "project-three",
    title: "Project Three",
    repo: "project-three",
    description: "A three-line description of what it does.",
    stack: ["React", "Node", "PostgreSQL"],
    demoUrl: "https://project-three.example.com",
  },
  // add the others here
];
