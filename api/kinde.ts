import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
} from "@kinde-oss/kinde-typescript-sdk";
import { type Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_AUTH_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_ID!,
    redirectURL: process.env.KINDE_REDIRECT_URL!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URL!,
  }
);

// Client for client credentials flow
export const kindeApiClient = createKindeServerClient(
  GrantType.CLIENT_CREDENTIALS,
  {
    authDomain: process.env.KINDE_AUTH_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URL!,
  }
);

export const honoSessionManager = (c: Context): SessionManager => ({
  async getSessionItem(itemKey) {
    const result = getCookie(c, itemKey);
    return result;
  },
  async setSessionItem(itemKey, itemValue) {
    const cookiesOptions: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;

    if (typeof itemValue === "string") {
      setCookie(c, itemKey, itemValue, cookiesOptions);
    } else {
      setCookie(c, itemKey, JSON.stringify(itemValue), cookiesOptions);
    }
  },
  async removeSessionItem(itemKey) {
    deleteCookie(c, itemKey);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});