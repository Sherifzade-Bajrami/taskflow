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
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-600">{description}</p>
    <div className="mt-5 flex items-center gap-2">
  <button
    type="button"
    onClick={onEdit}
    className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={onDelete}
    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
  >
    Delete
  </button>
</div>
    </article>
  );
}

export default ProjectCard;
