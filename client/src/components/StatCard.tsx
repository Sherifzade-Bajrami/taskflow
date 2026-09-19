type StatCardProps = {
  label: string
  value: number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-zinc-500">
        {label}
      </p>

      <strong className="mt-2 block text-3xl font-semibold text-zinc-900">
        {value}
      </strong>
    </article>
  )
}

export default StatCard