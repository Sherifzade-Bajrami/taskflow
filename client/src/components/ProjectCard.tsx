type ProjectStatus = 'Active' | 'Completed' | 'On Hold'

type ProjectCardProps = {
  title: string
  description: string
  status: ProjectStatus
}

function ProjectCard({
  title,
  description,
  status,
}: ProjectCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-950">
          {title}
        </h2>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-600">
        {description}
      </p>
    </article>
  )
}

export default ProjectCard