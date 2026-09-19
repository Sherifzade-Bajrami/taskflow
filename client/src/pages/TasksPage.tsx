import { useState } from "react";

import NewTaskModal from "../components/NewTaskModal";
import TaskCard from "../components/TaskCard";
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

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Create dashboard design",
    status: "Completed",
    priority: "High",
    dueDate: "Sep 20, 2026",
    assignee: "Sherifzade",
  },
  {
    id: 2,
    title: "Build projects API",
    status: "In Progress",
    priority: "High",
    dueDate: "Sep 24, 2026",
    assignee: "Sherifzade",
  },
  {
    id: 3,
    title: "Prepare landing page",
    status: "Todo",
    priority: "Medium",
    dueDate: "Sep 28, 2026",
    assignee: "Alex",
  },
];

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | TaskStatus>("All");

  const handleCreateTask = (
    title: string,
    status: TaskStatus,
    priority: TaskPriority,
    dueDate: string,
    assignee: string,
  ) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      status,
      priority,
      dueDate,
      assignee,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);

    setIsNewTaskOpen(false);
  };
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <main>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-950">Tasks</h1>

          <p className="mt-2 text-zinc-600">
            Track and manage your team&apos;s work.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewTaskOpen(true)}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          New Task
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900 sm:max-w-sm"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as "All" | TaskStatus)
          }
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900"
        >
          <option value="All">All statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredTasks.length === 0 && (
          <p className="text-sm text-zinc-500">No tasks found.</p>
        )}
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            status={task.status}
            priority={task.priority}
            dueDate={task.dueDate}
            assignee={task.assignee}
          />
        ))}
      </section>
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onCreate={handleCreateTask}
      />
    </main>
  );
}

export default TasksPage;
