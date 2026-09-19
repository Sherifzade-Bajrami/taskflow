function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8">
      <div>
        <p className="text-sm text-zinc-500">
          Workspace
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-zinc-900">
            Sherifzade
          </p>

          <p className="text-xs text-zinc-500">
            Admin
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white">
          S
        </div>
      </div>
    </header>
  )
}

export default Header