import { type ApiRoutes } from "@api/app";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const api = client.api;

export const loginPath = "https://expense-tracker-ug6r.onrender.com/api/login";
export const registerPath = "https://expense-tracker-ug6r.onrender.com/api/register";
