import { zValidator } from "@hono/zod-validator";
import { v4 as uuid } from "uuid";
import { Hono } from "hono";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.number(),
});

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  {
    id: "5a763ed2-7168-4ccd-9e47-710ebd56fc0d",
    title: "Groceries",
    amount: 150.75,
  },
  {
    id: "f982950e-a833-4048-9219-ed54e266c72d",
    title: "Electricity Bill",
    amount: 85.6,
  },
  {
    id: "b17eecb5-e521-4e01-9590-ad3701c13cab",
    title: "Internet Subscription",
    amount: 49.99,
  },
  {
    id: "24c48311-673e-457b-85f7-3e5fa0e6ea3c",
    title: "Transportation",
    amount: 30,
  },
  {
    id: "8a3e7c15-6092-4546-8093-a4ecfdbe4361",
    title: "Dining Out",
    amount: 60.25,
  },
];

const createPostSchema = expenseSchema.omit({ id: true });

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const newExpense = await c.req.valid("json");

    fakeExpenses.push({ ...newExpense, id: uuid() });

    return c.json(newExpense, 201);
  })
  .get("/:id", (c) => {
    const id = c.req.param("id");
    const expense = fakeExpenses.find((expense) => expense.id === id);

    console.log(expense);
    if (!expense) {
      return c.json({ error: "Expense not found" }, 404);
    }

    return c.json(expense);
  })
  .delete("/:id", (c) => {
    const id = c.req.param("id");
    console.log(id);
    const expenseIndex = fakeExpenses.findIndex((expense) => expense.id === id);

    if (expenseIndex == -1) {
      return c.json({ error: "Not found" }, 404);
    }

    fakeExpenses.splice(expenseIndex, 1);

    return c.json(fakeExpenses[expenseIndex], 200);
  });
