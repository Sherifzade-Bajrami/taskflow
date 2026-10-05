import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8fa] px-4 py-10 transition-colors dark:bg-zinc-950">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-lg font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          404
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            <Home size={17} />
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;