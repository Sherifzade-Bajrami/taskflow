type TaskStatus = "Todo" | "In Progress" | "Completed";
type TaskPriority = "Low" | "Medium" | "High";

type TaskCardProps = {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
  onEdit: () => void;
  onDelete: () => void;
};

function TaskCard({
  title,
  status,
  priority,
  dueDate,
  assignee,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>

          <p className="mt-2 text-sm text-zinc-500">
            Assigned to{" "}
            <span className="font-medium text-zinc-700">{assignee}</span>
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            status === "Completed"
              ? "bg-emerald-50 text-emerald-700"
              : status === "In Progress"
                ? "bg-violet-50 text-violet-700"
                : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {status}
        </span>
      </div>

<div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between">        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              priority === "High"
                ? "bg-red-50 text-red-700"
                : priority === "Medium"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {priority}
          </span>

          <span className="text-sm text-zinc-500">Due {dueDate}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
