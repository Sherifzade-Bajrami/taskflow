import { useState, type FormEvent } from "react";

type TaskStatus = "Todo" | "In Progress" | "Completed";
type TaskPriority = "Low" | "Medium" | "High";

type NewTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    title: string,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: string,
    assignee: string,
  ) => void;
};

function NewTaskModal({
  isOpen,
  onClose,
  onCreate,
}: NewTaskModalProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("Todo");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setTitle("");
    setStatus("Todo");
    setPriority("Medium");
    setDueDate("");
    setAssignee("");
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !dueDate || !assignee.trim()) {
      setError("Title, due date and assignee are required.");
      return;
    }

    onCreate(
      title.trim(),
      status,
      priority,
      dueDate,
      assignee.trim(),
    );

    resetForm();
  };

  const handleClose = () => {
    resetForm();
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
        aria-labelledby="new-task-title"
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2
            id="new-task-title"
            className="text-xl font-semibold text-zinc-950"
          >
            New Task
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Create a new task for your team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Title
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900"
              placeholder="Task title"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-status"
                className="mb-1 block text-sm font-medium text-zinc-700"
              >
                Status
              </label>

              <select
                id="task-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as TaskStatus)
                }
                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="mb-1 block text-sm font-medium text-zinc-700"
              >
                Priority
              </label>

              <select
                id="task-priority"
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as TaskPriority)
                }
                className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Due Date
            </label>

            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="task-assignee"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Assignee
            </label>

            <input
              id="task-assignee"
              type="text"
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
              placeholder="Assigned team member"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskModal;