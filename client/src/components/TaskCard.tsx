type TaskStatus = "Todo" | "In Progress" | "Completed";
type TaskPriority = "Low" | "Medium" | "High";

type TaskCardProps = {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
};

function TaskCard({
  title,
  status,
  priority,
  dueDate,
  assignee,
}: TaskCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-semibold text-zinc-950">{title}</h2>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          {status}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-zinc-600">
        <p>
          Priority:{" "}
          <span className="font-medium text-zinc-900">{priority}</span>
        </p>

        <p>
          Due: <span className="font-medium text-zinc-900">{dueDate}</span>
        </p>

        <p>
          Assigned to:{" "}
          <span className="font-medium text-zinc-900">{assignee}</span>
        </p>
      </div>
    </article>
  );
}

export default TaskCard;