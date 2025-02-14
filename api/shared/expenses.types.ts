import { z } from "zod";
import { insertExpensesSchema } from "../db/schemas/expenses";

export const expenseSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;
