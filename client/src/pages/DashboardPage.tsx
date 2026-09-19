import StatCard from '../components/StatCard'

type Stat = {
  label: string
  value: number
}

const stats: Stat[] = [
  { label: 'Total Projects', value: 12 },
  { label: 'Total Tasks', value: 48 },
  { label: 'Completed Tasks', value: 31 },
  { label: 'Pending Tasks', value: 17 },
  { label: 'Team Members', value: 8 },
]

function DashboardPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-sm font-medium text-zinc-500">
            Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-zinc-950">
            Welcome back
          </h1>

          <p className="mt-2 text-zinc-600">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </section>
      </div>
    </main>
  )
}

export default DashboardPage