import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";

type TaskStatus = "Todo" | "In Progress" | "Completed";
type TaskPriority = "Low" | "Medium" | "High";

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
};

type EditTaskModalProps = {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
};

function EditTaskModal({
  task,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [assignee, setAssignee] = useState(task.assignee);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !dueDate || !assignee.trim()) {
      setError("Title, due date and assignee are required.");
      return;
    }

    onSave({
      ...task,
      title: title.trim(),
      status,
      priority,
      dueDate,
      assignee: assignee.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl"
      >
        <div className="mb-6">
          <h2
            id="edit-task-title"
            className="text-xl font-semibold text-zinc-950"
          >
            Edit Task
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Update this task&apos;s information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-task-name"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Title
            </label>

            <input
              id="edit-task-name"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-task-status"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                Status
              </label>

              <div className="relative">
                <select
                  id="edit-task-status"
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
                htmlFor="edit-task-priority"
                className="mb-1.5 block text-sm font-medium text-zinc-700"
              >
                Priority
              </label>

              <div className="relative">
                <select
                  id="edit-task-priority"
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
              htmlFor="edit-task-date"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Due Date
            </label>

            <input
              id="edit-task-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div>
            <label
              htmlFor="edit-task-assignee"
              className="mb-1.5 block text-sm font-medium text-zinc-700"
            >
              Assignee
            </label>

            <input
              id="edit-task-assignee"
              type="text"
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
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
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;