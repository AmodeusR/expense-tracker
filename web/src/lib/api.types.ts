import { ClientResponse } from "hono/client";
import { api } from "./api";

type ExtractResponseData<T> = T extends ClientResponse<infer U> ? U : never;
type ExtractExpenses<T> = T extends { expenses: (infer U)[]} ? U : never;

export type Expense =  ExtractExpenses<ExtractResponseData<Awaited<ReturnType<typeof api.expenses.$get>>>>;