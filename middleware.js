import { clerkMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/account", "/transaction"];

function isProtectedRoute(url) {
  return protectedRoutes.some((route) => url.pathname.startsWith(route));
}

export default clerkMiddleware(async (req) => {
  const { userId } = req.auth;

  if (!userId && isProtectedRoute(new URL(req.url))) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|robots.txt|.*\\.(css|js|jpg|jpeg|png|svg|webp|gif|woff2?|ttf|map)).*)',
  ],
};
