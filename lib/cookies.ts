import { cookies } from "next/headers";

const ACCESS_COOKIE = "access_token";

// --- Guardar access_token ---
export async function setAccessTokenCookie(token: string) {
  const store = await cookies();
  console.log("[COOKIES] Setting cookie:", ACCESS_COOKIE, "with token:", token.substring(0, 20) + "...");
  store.set({
    name: ACCESS_COOKIE, 
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hora
  });
  console.log("[COOKIES] Cookie set successfully");
}

// --- Borrar cookie ---
export async function clearAccessTokenCookie() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
}

// --- Obtener access_token ---
export async function getAccessTokenFromCookie() {
  const store = await cookies();
  const token = store.get(ACCESS_COOKIE)?.value ?? null;
  console.log("[COOKIES] Getting cookie:", ACCESS_COOKIE, "value:", token ? token.substring(0, 20) + "..." : "null");
  return token;
}
