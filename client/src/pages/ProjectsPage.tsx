import { useState } from "react";
import NewProjectModal from "../components/NewProjectModal";
import ProjectCard from "../components/ProjectCard";

type ProjectStatus = "Active" | "Completed" | "On Hold";

type Project = {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
};
const initialProjects: Project[] = [
  {
    id: 1,
    title: "Website Redesign",
    description:
      "Redesign the company website and improve the user experience.",
    status: "Active",
  },
  {
    id: 2,
    title: "Mobile Application",
    description: "Build the first version of the TaskFlow mobile experience.",
    status: "On Hold",
  },
  {
    id: 3,
    title: "Marketing Website",
    description: "Create a new landing page for the upcoming product launch.",
    status: "Completed",
  },
];

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const handleCreateProject = (
  title: string,
  description: string,
  status: ProjectStatus,
) => {
  const newProject: Project = {
    id: Date.now(),
    title,
    description,
    status,
  }

  setProjects((currentProjects) => [
    ...currentProjects,
    newProject,
  ])

  setIsNewProjectOpen(false)
}
  return (
    <main>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-950">Projects</h1>

          <p className="mt-2 text-zinc-600">
            Manage and track all your team projects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewProjectOpen(true)}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          New Project
        </button>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
          />
        ))}
      </section>
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreate={handleCreateProject}
      />
    </main>
  );
}

export default ProjectsPage;
