import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { transactionFormSchema, TransactionFormValues } from "../types/schema";
import { useFinanceStore } from "../../../shared/store/useFinanceStore";

export function TransactionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { accounts, addTransaction } = useFinanceStore();
  const { register, handleSubmit, reset } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
  });

  if (!isOpen) return null;

  const onSubmit = (data: TransactionFormValues) => {
    const target = accounts.find((a) => a.id === data.accountId);
    addTransaction({
      ...data,
      accountName: target ? target.name : "Unknown Account",
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-sky-950/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="glass-card max-w-md w-full relative z-10 p-6 space-y-4 rounded-[32px]">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-900">Log Ledger Entry</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-sky-100">
            <X className="h-4 w-4 text-slate-700" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <select
            {...register("accountId")}
            className="w-full border border-sky-200 p-2 rounded-2xl text-sm bg-sky-50 text-foreground"
          >
            <option value="">Select Account</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Merchant"
            {...register("merchant")}
            className="w-full border border-sky-200 p-2 rounded-2xl text-sm bg-sky-50 text-foreground"
          />
          <select
            {...register("category")}
            className="w-full border border-sky-200 p-2 rounded-2xl text-sm bg-sky-50 text-foreground"
          >
            <option value="Food & Dining">Food & Dining</option>
            <option value="Income">Income</option>
            <option value="Housing">Housing</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Amount (negative for expense)"
            {...register("amount")}
            className="w-full border border-sky-200 p-2 rounded-2xl text-sm bg-sky-50 text-foreground"
          />
          <input
            type="date"
            {...register("date")}
            className="w-full border border-sky-200 p-2 rounded-2xl text-sm bg-sky-50 text-foreground"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-2xl font-medium text-sm hover:bg-sky-500 transition-colors"
          >
            Commit Position
          </button>
        </form>
      </div>
    </div>
  );
}
