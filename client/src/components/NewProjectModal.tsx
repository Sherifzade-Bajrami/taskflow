import { useState, type FormEvent } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-project-title"
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2
            id="new-project-title"
            className="text-xl font-semibold text-zinc-950"
          >
            New Project
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Create a new project for your team.
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
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900"
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
              className="w-full resize-none rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900"
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

            <select
              id="project-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ProjectStatus)
              }
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900"
            >
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
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
