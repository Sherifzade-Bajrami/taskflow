type ProjectStatus = "Active" | "Completed" | "On Hold";

type ProjectCardProps = {
  title: string;
  description: string;
  status: ProjectStatus;
  onEdit: () => void;
  onDelete: () => void;
};

function ProjectCard({
  title,
  description,
  status,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {" "}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            status === "Completed"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : status === "On Hold"
                ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                : "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="mt-6 flex items-center gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        {" "}
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
