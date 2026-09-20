import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-task-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
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
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Title
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Task title"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-status"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                Status
              </label>

              <div className="relative">
                <select
                  id="task-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as TaskStatus)
                  }
                  className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                Priority
              </label>

              <div className="relative">
                <select
                  id="task-priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value as TaskPriority)
                  }
                  className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Due Date
            </label>

            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div>
            <label
              htmlFor="task-assignee"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Assignee
            </label>

            <input
              id="task-assignee"
              type="text"
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
              placeholder="Assigned team member"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
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
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskModal;