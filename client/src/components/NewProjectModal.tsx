import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

type ProjectStatus = "Active" | "Completed" | "On Hold";

type NewProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string, status: ProjectStatus) => void;
};

function NewProjectModal({ isOpen, onClose, onCreate }: NewProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Active");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    onCreate(title.trim(), description.trim(), status);

    setTitle("");
    setDescription("");
    setStatus("Active");
    setError("");
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStatus("Active");
    setError("");

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-project-title"
        className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-zinc-950">New Project</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Create a new project for your workspace.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="project-title"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Title
            </label>

            <input
              id="project-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
              placeholder="Project title"
            />
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Description
            </label>

            <textarea
              id="project-description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-28 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
              placeholder="Project description"
            />
          </div>

          <div>
            <label
              htmlFor="project-status"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Status
            </label>

            <div className="relative">
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as ProjectStatus)
                }
                className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
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
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProjectModal;
