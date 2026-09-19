type NewProjectModalProps = {
  isOpen: boolean
  onClose: () => void
}

function NewProjectModal({
  isOpen,
  onClose,
}: NewProjectModalProps) {
  if (!isOpen) {
    return null
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

        <form className="space-y-4">
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
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900"
            >
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
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
  )
}

export default NewProjectModal