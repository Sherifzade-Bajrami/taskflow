import { useState } from "react";
import { ChevronDown } from "lucide-react";
import NewProjectModal from "../components/NewProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
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
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

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
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
            Projects
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Manage projects
          </h1>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
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
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row">
        {" "}
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-violet-500 dark:focus:bg-zinc-800 dark:focus:ring-violet-950 sm:max-w-sm"
        />
        <div className="relative w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "All" | ProjectStatus)
            }
            className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-3 pr-10 text-sm text-zinc-900 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-violet-500 dark:focus:bg-zinc-800 dark:focus:ring-violet-950"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
          />
        </div>
      </div>

      <section className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="font-medium text-zinc-900 dark:text-white">
              No projects found
            </p>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Try changing your search or status filter.
            </p>
          </div>
        )}
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
            onEdit={() => setSelectedProject(project)}
            onDelete={() => setProjectToDelete(project)}
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
      {projectToDelete && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Delete project?"
          description={`Are you sure you want to delete "${projectToDelete.title}"? This action cannot be undone.`}
          onCancel={() => setProjectToDelete(null)}
          onConfirm={() => {
            handleDeleteProject(projectToDelete.id);
            setProjectToDelete(null);
          }}
        />
      )}
    </main>
  );
}

export default ProjectsPage;
