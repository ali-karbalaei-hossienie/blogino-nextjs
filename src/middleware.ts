// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import middlewareAuth from "@/utils/middlewareAuth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthPage =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");
  const isProfilePage = pathname.startsWith("/profile");

  const user = await middlewareAuth(req);

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProfilePage && !user) {
    const signinUrl = new URL(
      `/signin?redirect=${encodeURIComponent(pathname)}`,
      req.url,
    );
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"],
};
