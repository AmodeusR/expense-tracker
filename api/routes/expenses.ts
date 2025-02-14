import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getUser } from "../kinde";
import { db } from "../db";
import { expensesTable, insertExpensesSchema } from "../db/schemas/expenses";
import { desc, eq } from "drizzle-orm";
import { expenseSchema } from "../shared/expenses.types";



export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    // Get all expenses
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, c.var.user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(15);

    return c.json({ expenses });
  })
  .post("/", getUser, zValidator("json", expenseSchema), async (c) => {
    // Create a new expense
    const newExpense = c.req.valid("json");

    const validatedExpense = insertExpensesSchema.safeParse({...newExpense, userId: c.var.user.id});

    if (!validatedExpense.success) {
      return c.json({message: "Invalid expense", error: validatedExpense.error}, 400);
    }

    const result = await db
      .insert(expensesTable)
      .values(validatedExpense.data)
      .returning();

    return c.json(result, 201);
  })
  .get("/total-spent", getUser, async (c) => {
    // Get total spent
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
    // Get a single expense
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
    // Delete a single expense
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
