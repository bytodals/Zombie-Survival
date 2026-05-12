import { useEffect, useState } from "react";
import { Sword, Plus, Search, Filter, Shield, Zap, Package } from "lucide-react";
import { getWeapons } from "../api/weapons";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { ProgressBar } from "../components/ui/ProgressBar";
import type { Weapon } from "../../../shared/types/api";

export default function WeaponsPage() {
  const [rows, setRows] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getWeapons()
      .then((res) => setRows(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredRows = rows.filter((w) => w.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalQuantity = rows.reduce((sum, w) => sum + w.quantity, 0);
  const avgDamage = rows.length ? Math.round(rows.reduce((sum, w) => sum + w.damage, 0) / rows.length) : 0;
  const lowStock = rows.filter((w) => w.quantity < 10).length;

  const getDamageColor = (damage: number) => {
    if (damage >= 80) return "destructive" as const;
    if (damage >= 50) return "accent" as const;
    return "primary" as const;
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading arsenal inventory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading weapons</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Arsenal Inventory</h1>
          <p className="text-muted-foreground">Manage weapons and equipment for survivor defense</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Weapon
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Weapon Types" value={rows.length} icon={Sword} color="primary" />
        <StatCard title="Total Stock" value={totalQuantity} subtitle="Units available" icon={Package} color="teal" />
        <StatCard title="Avg Damage" value={avgDamage} subtitle="Per weapon" icon={Zap} color="accent" />
        <StatCard title="Low Stock" value={lowStock} subtitle="Need resupply" icon={Shield} color="destructive" />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search weapons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRows.map((weapon) => (
          <Card key={weapon.weapon_id} hover>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning-amber/15">
                <Sword className="h-6 w-6 text-warning-amber" />
              </div>
              <Badge variant={weapon.quantity < 10 ? "danger" : weapon.quantity < 30 ? "warning" : "success"}>
                {weapon.quantity} in stock
              </Badge>
            </CardHeader>
            <CardContent>
              <h3 className="mb-1 text-lg font-semibold text-foreground">{weapon.name}</h3>
              <p className="mb-4 text-xs text-muted-foreground">ID: {weapon.weapon_id}</p>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Damage Output</span>
                    <span className="text-sm font-bold text-foreground">{weapon.damage}</span>
                  </div>
                  <ProgressBar value={weapon.damage} max={100} size="md" color={getDamageColor(weapon.damage)} />
                </div>

                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {weapon.description || "Standard survival equipment for zombie defense operations."}
                </p>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-warning-amber" />
                    <span className="text-xs text-muted-foreground">
                      {weapon.damage >= 80 ? "High" : weapon.damage >= 50 ? "Medium" : "Low"} Power
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4 text-safe-teal" />
                    <span className="text-xs text-muted-foreground">{weapon.quantity} units</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRows.length === 0 && (
        <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-card">
          <p className="text-muted-foreground">No weapons found matching your search</p>
        </div>
      )}
    </div>
  );
}
