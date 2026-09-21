import { CheckCircle2, FolderKanban, ListTodo, Users } from "lucide-react";

import StatCard from "../components/StatCard";

const stats = [
  {
    label: "Total Projects",
    value: 12,
    icon: FolderKanban,
    description: "Across your workspace",
  },
  {
    label: "Total Tasks",
    value: 48,
    icon: ListTodo,
    description: "All assigned tasks",
  },
  {
    label: "Completed",
    value: 31,
    icon: CheckCircle2,
    description: "Tasks completed",
  },
  {
    label: "Team Members",
    value: 8,
    icon: Users,
    description: "Active collaborators",
  },
];
const recentProjects = [
  {
    id: 1,
    title: "Website Redesign",
    status: "Active",
    progress: 72,
  },
  {
    id: 2,
    title: "Mobile Application",
    status: "On Hold",
    progress: 45,
  },
  {
    id: 3,
    title: "Marketing Website",
    status: "Completed",
    progress: 100,
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: "Build authentication",
    dueDate: "Sep 24",
    priority: "High",
  },
  {
    id: 2,
    title: "Prepare dashboard API",
    dueDate: "Sep 26",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Review mobile layout",
    dueDate: "Sep 29",
    priority: "Low",
  },
];

function DashboardPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
              Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Welcome back, Sherifzade
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Here&apos;s an overview of your workspace today.
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
          >
            New Project
          </button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </section>
        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {" "}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-zinc-950 dark:text-white">
                  Recent Projects
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Your latest active projects.
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                View all
              </button>
            </div>
            <div className="space-y-5">
              {recentProjects.map((project) => (
                <div key={project.id}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {project.title}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {project.status}
                      </p>
                    </div>

                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-violet-600"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {" "}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-zinc-950 dark:text-white">
                  Upcoming Tasks
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {" "}
                  Tasks that need your attention.
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                View all
              </button>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {" "}
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {task.title}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Due {task.dueDate}
                    </p>
                  </div>

                  <span className="self-start rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 sm:self-auto">
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
