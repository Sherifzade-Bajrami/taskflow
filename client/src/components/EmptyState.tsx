import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
        <Icon size={22} />
      </div>

      <h2 className="mt-4 font-semibold text-zinc-950 dark:text-white">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;