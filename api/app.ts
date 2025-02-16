import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { cors } from "hono/cors";
import { authRoute } from "./routes/auth";

const app = new Hono();

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173", "https://my-expense-tracker.pages.dev"],
    allowMethods: ["GET", "POST"],
    credentials: true
  })
);

const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expensesRoute)
  .route("/", authRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
