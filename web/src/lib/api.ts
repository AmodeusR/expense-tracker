import { type ApiRoutes } from "@api/app";
import { hc } from "hono/client";


const client = hc<ApiRoutes>(import.meta.env.API_URL, {init: {
  credentials: "include"
}});

export const api = client.api;
