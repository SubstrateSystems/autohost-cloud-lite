import { cookies } from "next/headers";

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

// --- Guardar refresh_token ---
export async function setRefreshTokenCookie(token: string) {
  const store = await cookies();
  store.set({
    name: REFRESH_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });
}

// --- Obtener refresh_token ---
export async function getRefreshTokenFromCookie() {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value ?? null;
}

// --- Guardar access_token ---
export async function setAccessTokenCookie(token: string) {
  const store = await cookies();
  store.set({
    name: ACCESS_COOKIE, 
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hora
  });
}

// --- Borrar cookie ---
export async function clearAccessTokenCookie() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  console.log(`[COOKIES] Deleted ${ACCESS_COOKIE} cookie`);
}

export async function clearRefreshTokenCookie() {
  const store = await cookies();
  store.delete(REFRESH_COOKIE);
  console.log(`[COOKIES] Deleted ${REFRESH_COOKIE} cookie`);
}

// --- Obtener access_token ---
export async function getAccessTokenFromCookie() {
  const store = await cookies();
  const token = store.get(ACCESS_COOKIE)?.value ?? null;
  return token;
}
