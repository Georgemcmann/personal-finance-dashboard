import { useState, useMemo } from "react";
import { useFinanceStore } from "../../shared/store/useFinanceStore";
import { Trash2 } from "lucide-react";

export function TransactionTable() {
  const { transactions, deleteTransaction } = useFinanceStore();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((t) =>
      t.merchant.toLowerCase().includes(search.toLowerCase()),
    );
  }, [transactions, search]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ledger Operations</h1>
        <p className="text-sm text-slate-500">
          Monitor and audit cash streams running across accounts.
        </p>
      </div>

      <input
        type="text"
        placeholder="Filter transactions by merchant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm border border-sky-200 p-2 rounded-2xl text-sm bg-sky-50"
      />

      <div className="glass-card rounded-[28px] overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-sky-50 text-slate-500 text-xs font-semibold uppercase border-b border-sky-100">
              <th className="p-4">Merchant</th>
              <th className="p-4">Category</th>
              <th className="p-4">Account</th>
              <th className="p-4 text-right">Settled Value</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-sky-100 hover:bg-sky-50"
              >
                <td className="p-4 font-medium text-slate-900">
                  {tx.merchant}
                </td>
                <td className="p-4 text-slate-600">{tx.category}</td>
                <td className="p-4 text-slate-500">{tx.accountName}</td>
                <td
                  className={`p-4 text-right font-semibold ${tx.amount > 0 ? "text-sky-600" : "text-rose-600"}`}
                >
                  {tx.amount > 0
                    ? `+$${tx.amount}`
                    : `-$${Math.abs(tx.amount)}`}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => deleteTransaction(tx.id)}
                    className="text-rose-600 hover:text-rose-700"
                  >
                    <Trash2 className="h-4 w-4 mx-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
