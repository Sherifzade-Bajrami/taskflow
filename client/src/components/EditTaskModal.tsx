import { useState, type FormEvent } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-zinc-950">
          Edit Task
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="edit-task-title"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Title
            </label>

            <input
              id="edit-task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-task-status"
                className="mb-1 block text-sm font-medium text-zinc-700"
              >
                Status
              </label>

              <select
                id="edit-task-status"
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
                htmlFor="edit-task-priority"
                className="mb-1 block text-sm font-medium text-zinc-700"
              >
                Priority
              </label>

              <select
                id="edit-task-priority"
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
              htmlFor="edit-task-date"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Due Date
            </label>

            <input
              id="edit-task-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="edit-task-assignee"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Assignee
            </label>

            <input
              id="edit-task-assignee"
              type="text"
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2"
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
              onClick={onClose}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
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