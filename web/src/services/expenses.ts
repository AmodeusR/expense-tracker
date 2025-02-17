import { api } from "@/lib/api";

export const getTotalSpent = async () => {
  const response = await api.expenses["total-spent"].$get();

  if (!response.ok) {
    throw new Error("Server error");
  }
  const data = await response.json();

  return data;
};

export const getAllExpenses = async () => {
  const response = await api.expenses.$get();

  if (!response.ok) {
    throw new Error("Server error");
  }

  const data = await response.json();

  return data.expenses;
};

export const deleteExpense = async (id: number) => {
  const response = await api.expenses[":id"].$delete({ param: { id: String(id) } });

  if (!response.ok) {
    throw new Error("Server error on deletion");
  }
};
