import { cookies } from "next/headers";

const ACCESS_COOKIE = "ah_access";

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
}

// --- Obtener access_token ---
export async function getAccessTokenFromCookie() {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}
