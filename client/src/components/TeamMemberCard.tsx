type TeamRole = "Admin" | "Member";

type TeamMemberCardProps = {
  name: string;
  email: string;
  role: TeamRole;
  onEdit: () => void;
  onDelete: () => void;
};

function TeamMemberCard({
  name,
  email,
  role,
  onEdit,
  onDelete,
}: TeamMemberCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-base font-semibold text-violet-700">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate font-semibold text-zinc-950">{name}</h2>

              <p className="mt-1 truncate text-sm text-zinc-500">{email}</p>
            </div>
            <span
              className={` self-start shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                role === "Admin"
                  ? "bg-violet-50 text-violet-700"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              {role}
            </span>
          </div>

<div className="mt-5 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-4">            <button
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
        </div>
      </div>
    </article>
  );
}

export default TeamMemberCard;
