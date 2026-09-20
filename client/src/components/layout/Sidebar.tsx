import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Team",
    path: "/team",
    icon: Users,
  },
];

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-200 bg-white transition-transform duration-200 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">
              T
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight text-zinc-950">
                TaskFlow
              </p>

              <p className="text-xs text-zinc-400">
                Team workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Overview
          </p>

          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-violet-50 text-violet-700"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                      }`
                    }
                  >
                    <Icon size={18} />

                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-zinc-100 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
          >
            <Settings size={18} />
            Settings
          </button>

          <div className="mt-3 flex items-center gap-3 rounded-xl bg-zinc-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
              S
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900">
                Sherifzade
              </p>

              <p className="text-xs text-zinc-500">
                Admin
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;