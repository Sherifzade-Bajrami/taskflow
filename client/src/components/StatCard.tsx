import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number;
  icon: LucideIcon;
  description: string;
};

function StatCard({ label, value, icon: Icon, description }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {label}
          </p>
          <strong className="mt-2 block text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            {value}
          </strong>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Icon size={20} />
        </div>
      </div>
      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </article>
  );
}

export default StatCard;
