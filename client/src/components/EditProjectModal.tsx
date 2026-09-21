import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

type ProjectStatus = "Active" | "Completed" | "On Hold";

type Project = {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
};

type EditProjectModalProps = {
  project: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
};

function EditProjectModal({
  project,
  onClose,
  onSave,
}: EditProjectModalProps) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState<ProjectStatus>(project.status);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    onSave({
      ...project,
      title: title.trim(),
      description: description.trim(),
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-project-title"
className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"      >
        <div className="mb-6">
          <h2
            id="edit-project-title"
            className="text-xl font-semibold text-zinc-950 dark:text-zinc-300"
          >
            Edit Project
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Update your project information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-project-name"
              className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Title
            </label>

            <input
              id="edit-project-name"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-violet-500 dark:focus:bg-zinc-800 dark:focus:ring-violet-950"
            />
          </div>

          <div>
            <label
              htmlFor="edit-project-description"
              className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Description
            </label>

            <textarea
              id="edit-project-description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-28 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-violet-500 dark:focus:bg-zinc-800 dark:focus:ring-violet-950"
            />
          </div>

          <div>
            <label
              htmlFor="edit-project-status"
              className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Status
            </label>

            <div className="relative">
              <select
                id="edit-project-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as ProjectStatus)
                }
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-violet-500 dark:focus:bg-zinc-800 dark:focus:ring-violet-950"
              >
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

          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 dark:hover:bg-violet-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectModal;