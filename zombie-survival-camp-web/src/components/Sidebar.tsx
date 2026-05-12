import { NavLink } from "react-router-dom";
import { Users, BookOpen, Sword, Skull, LayoutDashboard, Shield } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/participants", icon: Users, label: "Survivors" },
  { to: "/courses", icon: BookOpen, label: "Training" },
  { to: "/weapons", icon: Sword, label: "Arsenal" },
  { to: "/zombie-behaviors", icon: Skull, label: "Threats" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 flex-shrink-0 border-r border-border bg-card">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
        <div className="mb-8 flex items-center gap-3 px-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">ZSC</h1>
            <p className="text-xs text-muted-foreground">Survival Camp</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-lg border border-border bg-secondary/50 p-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground">System Online</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Threat Level: <span className="font-semibold text-warning-amber">ELEVATED</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
