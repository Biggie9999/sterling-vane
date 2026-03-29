import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const { pathname } = req.nextUrl

  // Redirect authenticated users away from the landing page & login
  if (token && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Protect private routes — redirect unauthenticated users to login
  const privateRoutes = ["/dashboard", "/admin", "/apply", "/portfolio"]
  const isPrivate = privateRoutes.some(r => pathname === r || pathname.startsWith(r + "/"))
  if (isPrivate && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/admin/:path*",
    "/apply/:path*",
    "/portfolio/:path*",
  ],
}
