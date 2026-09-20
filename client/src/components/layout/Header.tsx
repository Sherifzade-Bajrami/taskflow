import { Bell, Menu, Search } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950 md:hidden"
        >
          <Menu size={19} />
        </button>

        <div>
          <p className="hidden text-sm text-zinc-500 sm:block">
            Workspace
          </p>

          <p className="font-semibold text-zinc-950">
            TaskFlow
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-600" />
        </button>
      </div>
    </header>
  );
}

export default Header;