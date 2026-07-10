import { z } from 'zod';
export const transactionFormSchema = z.object({
  accountId: z.string().min(1, 'Account allocation selection is required'),
  merchant: z.string().min(2, 'Merchant title must span at least 2 characters'),
  category: z.enum(['Income', 'Housing', 'Utilities', 'Food & Dining', 'Transportation', 'Entertainment', 'Investments', 'Savings']),
  amount: z.coerce.number().refine(val => val !== 0, 'Transaction amount cannot evaluate to 0'),
  date: z.string().min(1, 'Event processing timestamp required'),
  status: z.enum(['completed', 'pending', 'failed']).default('completed'),
});
export type TransactionFormValues = z.infer<typeof transactionFormSchema>;