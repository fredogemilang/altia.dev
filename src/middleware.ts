import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const adminRoute = process.env.PAYLOAD_ADMIN_ROUTE || "/ctrlaltia";
  const { pathname } = request.nextUrl;

  // Bypass Payload CMS Studio and Payload API from localization redirects
  if (
    pathname.startsWith(adminRoute) ||
    pathname.startsWith("/ctrlaltia") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  return handleI18n(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
