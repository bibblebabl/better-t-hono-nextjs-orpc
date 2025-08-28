import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

const publicRoutes = ["/login", "/register", "/"]

export async function middleware(request: NextRequest) {
  const session = await getSession()

  if (!(session || publicRoutes.includes(request.nextUrl.pathname))) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
}
