import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const access = req.cookies.get("access_token")?.value
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")

  console.log(`Middleware: access_token=${access ? "present" : "absent"}, path=${req.nextUrl.pathname}`)

  if (!access && !isAuthPage) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("next", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (access && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets).*)"],
}
