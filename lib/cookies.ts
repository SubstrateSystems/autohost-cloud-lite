import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const ACCESS_COOKIE  = "access_token";
export const REFRESH_COOKIE = "refresh_token";

const IS_PROD = process.env.NODE_ENV === "production";

/** Opciones para el access_token (vida corta) */
export const ACCESS_COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: "lax",
  secure:   IS_PROD,
  path:     "/",
  maxAge:   60 * 60, // 1 hora
};

/** Opciones para el refresh_token (vida larga) */
export const REFRESH_COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  sameSite: "lax",
  secure:   IS_PROD,
  path:     "/",
  maxAge:   60 * 60 * 24 * 30, // 30 días
};

// --- Leer cookies (server-side: Route Handlers y Server Components) ---

export async function getAccessTokenFromCookie(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshTokenFromCookie(): Promise<string | null> {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value ?? null;
}
