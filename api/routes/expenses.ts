import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getUser } from "../kinde";
import { db } from "../db";
import { expensesTable } from "../db/schemas/expenses";
import { desc, eq } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, c.var.user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(15);

    return c.json({ expenses });
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const newExpense = c.req.valid("json");

    const result = await db
      .insert(expensesTable)
      .values({
        ...newExpense,
        userId: c.var.user.id,
      })
      .returning();

    return c.json(result, 201);
  })
  .get("/total-spent", getUser, async (c) => {
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, c.var.user.id));

    const totalAmount = expenses.reduce((prev, curr) => {
      return prev + Number(curr.amount);
    }, 0);

    return c.json({ totalAmount });
  })
  .get("/:id", getUser, (c) => {
    const id = Number(c.req.param("id"));
    const expense = db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.id, id));

    if (!expense) {
      return c.json({ error: "Expense not found" }, 404);
    }

    return c.json(expense);
  })
  .delete("/:id", getUser, async (c) => {
    const id = Number(c.req.param("id"));

    const deletedExpense = await db
      .delete(expensesTable)
      .where(eq(expensesTable.id, id))
      .returning();
      
    if (!deletedExpense[0]) {
      return c.notFound();
    }

    return c.json(deletedExpense[0], 200);
  });
