import { CATEGORIES, PROJECTS } from "@/data";
import ProjectGroup from "./components/tree/project-group";

const ProjectTree: React.FC = () => {
  const groups = CATEGORIES.map((category) => ({
    category,
    projects: PROJECTS.filter((p) => p.category === category),
  })).filter((g) => g.projects.length > 0);

  return (
    <div className="space-y-6">
      {groups.map(({ category, projects }) => (
        <ProjectGroup key={category} category={category} projects={projects} />
      ))}
    </div>
  );
};

export default ProjectTree;
