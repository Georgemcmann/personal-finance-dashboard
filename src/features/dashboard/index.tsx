import { useFinanceStore } from "../../shared/store/useFinanceStore";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Wallet, ArrowUpRight, ArrowDownRight, Percent } from "lucide-react";
import { useMemo } from "react";
import { cn } from "../../utils/cn";

export function ExecutiveDashboard() {
  const { transactions, accounts, budgets } = useFinanceStore();

  const netWorth = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const chartData = useMemo(() => {
    return [
      {
        name: "Wk 1",
        Income: totalIncome * 0.2,
        Expenses: totalExpenses * 0.25,
      },
      {
        name: "Wk 2",
        Income: totalIncome * 0.3,
        Expenses: totalExpenses * 0.2,
      },
      {
        name: "Wk 3",
        Income: totalIncome * 0.25,
        Expenses: totalExpenses * 0.35,
      },
      {
        name: "Wk 4",
        Income: totalIncome * 0.25,
        Expenses: totalExpenses * 0.2,
      },
    ];
  }, [totalIncome, totalExpenses]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Executive Overview
        </h1>
        <p className="text-sm text-slate-500">
          Real-time portfolio positions telemetry node.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            name: "Net Worth",
            value: `$${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            icon: Wallet,
            desc: "Aggregated accounts",
          },
          {
            name: "Total Inflow",
            value: `$${totalIncome.toLocaleString()}`,
            icon: ArrowUpRight,
            desc: "Gross earnings",
          },
          {
            name: "Total Outflow",
            value: `$${totalExpenses.toLocaleString()}`,
            icon: ArrowDownRight,
            desc: "Settled liabilities",
          },
          {
            name: "Savings Rate",
            value: `${Math.max(0, savingsRate).toFixed(1)}%`,
            icon: Percent,
            desc: "Net cash preserved",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-[24px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                {card.name}
              </span>
              <card.icon className="h-5 w-5 text-sky-500" />
            </div>
            <h3 className="text-2xl font-bold mt-2 text-slate-900">
              {card.value}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-[32px]">
          <h3 className="font-semibold text-base mb-4 text-slate-900">
            Cash Flow Runways
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Income"
                  stroke="#10b981"
                  fill="#e6f4ea"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="Expenses"
                  stroke="#0ea5e9"
                  fill="rgba(14, 165, 233, 0.18)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-[32px] space-y-4">
          <h3 className="font-semibold text-base text-slate-900">
            Top Budgets Utilization
          </h3>
          <div className="space-y-4">
            {budgets.slice(0, 4).map((b) => {
              const pct = (b.spent / b.limit) * 100;
              return (
                <div key={b.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{b.category}</span>
                    <span className="text-slate-500">
                      ${b.spent} / ${b.limit}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full",
                        pct > 100 ? "bg-rose-500" : "bg-sky-600",
                      )}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
