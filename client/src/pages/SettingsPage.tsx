import { useState, type FormEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function SettingsPage() {
  const [name, setName] = useState("Sherifzade Bajrami");
  const [email, setEmail] = useState("sherifzade@example.com");
  const [message, setMessage] = useState("");

  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("Profile updated successfully.");
  };

  return (
    <main>
      <div className="mx-auto max-w-3xl">
        <div>
          <p className="text-sm font-medium text-violet-600">Settings</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Account settings
          </h1>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Manage your profile and workspace preferences.
          </p>
        </div>

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 pb-5 dark:border-zinc-800">
            <h2 className="font-semibold text-zinc-950 dark:text-white">
              Profile information
            </h2>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Update your personal information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="settings-name"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Full name
              </label>

              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-violet-500 dark:focus:bg-zinc-800 dark:focus:ring-violet-950"
              />
            </div>

            <div>
              <label
                htmlFor="settings-email"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>

              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-violet-500 dark:focus:bg-zinc-800 dark:focus:ring-violet-950"
              />
            </div>

            <div>
              <label
                htmlFor="settings-role"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Role
              </label>

              <input
                id="settings-role"
                type="text"
                value="Admin"
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2.5 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
              />
            </div>

            {message && (
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {message}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-950 dark:text-zinc-300">
            Appearance
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Customize how TaskFlow looks.
          </p>

          <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-300">
                Dark mode
              </p>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Switch between light and dark appearance.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SettingsPage;
