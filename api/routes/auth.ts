import { Hono } from "hono";
import { honoSessionManager, kindeClient } from "../kinde";

export const authRoute = new Hono();

authRoute.get("/login", async (c) => {
  const loginUrl = await kindeClient.login(honoSessionManager(c));

  return c.redirect(loginUrl.toString());
});

authRoute.get("/register", async (c) => {
  const registerUrl = await kindeClient.register(honoSessionManager(c));

  return c.redirect(registerUrl.toString());
});

authRoute.get("/callback", async (c) => {
  const url = new URL(c.req.url);
  await kindeClient.handleRedirectToApp(honoSessionManager(c), url);
  return c.redirect("/");
});

authRoute.get("/logout", async (c) => {
  const logoutUrl = await kindeClient.logout(honoSessionManager(c));

  return c.redirect(logoutUrl.toString());
});

authRoute.get("/me", async (c) => {
  const sessionManager = honoSessionManager(c);
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager);

  if(isAuthenticated) {
    const user = await kindeClient.getUserProfile(sessionManager);

    return c.json({ user });
  }

  return c.json({ error: "Unauthorized"}, 401);
})
