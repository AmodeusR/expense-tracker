import { Hono } from "hono";
import { getUser, honoSessionManager, kindeClient } from "../kinde";

export const authRoute = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(honoSessionManager(c));

    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(honoSessionManager(c));

    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(honoSessionManager(c), url);

    return c.redirect(process.env.HOME_URL!);
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(honoSessionManager(c));

    return c.redirect(logoutUrl.toString());
  })
  .get("/me", getUser, async (c) => {
    const user = c.var.user;

    return c.json({ user });
  });
