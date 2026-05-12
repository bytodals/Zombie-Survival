import { Bell, Search, Radio } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search survivors, weapons..."
            className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 text-xs text-muted-foreground md:inline-block">
            /
          </kbd>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
            <Radio className="h-3.5 w-3.5 animate-pulse text-primary" />
            <span className="text-xs font-medium text-primary">All Clear</span>
          </div>

          <button className="relative rounded-lg border border-border bg-secondary p-2 transition-colors hover:bg-secondary/80">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full p-0.5">
              <img
                src="/Biohazard.svg.png"
                alt="Zombie Survival Camp"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
