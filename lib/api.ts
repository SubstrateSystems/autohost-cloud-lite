export async function proxySetCookie(from: Response, to: Response) {
  const setCookie = from.headers.get("set-cookie");
  if (setCookie) {
    to.headers.set("set-cookie", setCookie);
  }
}

// Helper para llamar al backend con Authorization (si tenemos access)
export async function backendFetch(
  input: string,
  init: RequestInit = {},
  accessToken?: string
) {
  const url =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080") + input;

  const headers = new Headers(init.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");

  return fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
}
