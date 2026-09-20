import { useState } from "react";
import { ChevronDown } from "lucide-react";
import NewProjectModal from "../components/NewProjectModal";
import EditProjectModal from "../components/EditProjectModal";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ProjectStatus>(
    "All",
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    };

    setProjects((currentProjects) => [...currentProjects, newProject]);

    setIsNewProjectOpen(false);
  };
  const handleUpdateProject = (updatedProject: Project) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );

    setSelectedProject(null);
  };
  const handleDeleteProject = (id: number) => {
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== id),
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <main>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-violet-600">Projects</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950">
            Manage projects
          </h1>

          <p className="mt-2 text-zinc-500">
            Create, organize and track your team projects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewProjectOpen(true)}
          className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
        >
          New Project
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 sm:max-w-sm"
        />

        <div className="relative w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "All" | ProjectStatus)
            }
            className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
        </div>
      </div>

      <section className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
            onEdit={() => setSelectedProject(project)}
            onDelete={() => handleDeleteProject(project.id)}
          />
        ))}
      </section>
      <NewProjectModal
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreate={handleCreateProject}
      />
      {selectedProject && (
        <EditProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSave={handleUpdateProject}
        />
      )}
    </main>
  );
}

export default ProjectsPage;
