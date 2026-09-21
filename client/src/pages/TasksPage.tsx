import { useState } from "react";
import { ChevronDown } from "lucide-react";
import NewTaskModal from "../components/NewTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );

    setSelectedTask(null);
  };
  const handleDeleteTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-violet-600">Tasks</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950">
            Manage tasks
          </h1>

          <p className="mt-2 text-zinc-500">
            Plan, assign and track your team&apos;s work.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsNewTaskOpen(true)}
          className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
        >
          New Task
        </button>
      </div>
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 sm:max-w-sm"
        />

        <div className="relative w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "All" | TaskStatus)
            }
            className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
          >
            <option value="All">All statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
        </div>
      </div>
      <section className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {" "}
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
            onEdit={() => setSelectedTask(task)}
            onDelete={() => setTaskToDelete(task)}
          />
        ))}
      </section>
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onCreate={handleCreateTask}
      />
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleUpdateTask}
        />
      )}
      {taskToDelete && (
        <ConfirmDeleteModal
          isOpen={true}
          title="Delete task?"
          description={`Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={() => {
            handleDeleteTask(taskToDelete.id);
            setTaskToDelete(null);
          }}
        />
      )}
    </main>
  );
}

export default TasksPage;
