import {
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expensesTable = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (expenses) => {
    return [
      index("namde_idx").on(expenses.userId),
    ];
  }
);

export const insertExpensesSchema = createInsertSchema(expensesTable, {
  title: z.string().min(3).max(25),
  amount: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "The value must be positive and decimal up to two digits"
    ),
});
export const selectExpensesSchema = createSelectSchema(expensesTable);
