import { useFinanceStore } from "../../shared/store/useFinanceStore";
import { ShieldCheck, Target } from "lucide-react";

export function BudgetsModule() {
  const { budgets, savingsGoals } = useFinanceStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Budgets & Targets</h1>
        <p className="text-sm text-slate-500">
          Manage ongoing categorical safety thresholds and wealth caps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((b) => (
          <div key={b.id} className="glass-card p-5 rounded-[28px] space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-slate-900">{b.category}</h4>
              <ShieldCheck className="h-4 w-4 text-sky-500" />
            </div>
            <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500"
                style={{
                  width: `${Math.min((b.spent / b.limit) * 100, 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>${b.spent} Spent</span>
              <span>${b.limit} Cap</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savingsGoals.map((g) => (
          <div key={g.id} className="glass-card p-6 rounded-[28px] space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-lg text-slate-900">{g.name}</h4>
              <Target className="h-5 w-5 text-sky-500" />
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold text-slate-900">
                ${g.currentAmount}
              </span>
              <span className="text-xs text-slate-500">
                Targeting ${g.targetAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
