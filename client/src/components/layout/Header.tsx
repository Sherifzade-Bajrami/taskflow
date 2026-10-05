import { useEffect, useRef, useState } from "react";
import { Bell, Menu, Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

type HeaderProps = {
  onMenuClick: () => void;
};

const initialNotifications = [
  {
    id: 1,
    title: "New task assigned",
    message: "You were assigned to Build authentication.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Project updated",
    message: "Website Redesign was updated.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Task completed",
    message: "Review mobile layout was completed.",
    time: "Yesterday",
    unread: false,
  },
];

function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const handleNotificationClick = (id: number) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification,
      ),
    );
  };

  const hasUnreadNotifications = notifications.some(
    (notification) => notification.unread,
  );

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-200 bg-white/95 px-4 backdrop-blur transition-colors dark:border-zinc-800 dark:bg-zinc-950/95 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white md:hidden"
        >
          <Menu size={19} />
        </button>

        <div>
          <p className="hidden text-sm text-zinc-500 dark:text-zinc-400 sm:block">
            Workspace
          </p>

          <p className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white">
            TaskFlow
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <div
          ref={notificationsRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setIsNotificationsOpen(
                (current) => !current,
              )
            }
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
          >
            <Bell size={18} />

            {hasUnreadNotifications && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-600" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
              <div className="border-b border-zinc-100 px-4 py-4 dark:border-zinc-800">
                <h2 className="font-semibold text-zinc-950 dark:text-white">
                  Notifications
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  Recent activity in your workspace
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() =>
                      handleNotificationClick(
                        notification.id,
                      )
                    }
                    className="flex w-full gap-3 border-b border-zinc-100 px-4 py-4 text-left transition last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                  >
                    <div className="mt-1">
                      <span
                        className={`block h-2 w-2 rounded-full ${
                          notification.unread
                            ? "bg-violet-600"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm ${
                          notification.unread
                            ? "font-semibold text-zinc-950 dark:text-white"
                            : "font-medium text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {notification.title}
                      </p>

                      <p className="mt-1 text-sm leading-5 text-zinc-500 dark:text-zinc-400">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                        {notification.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;