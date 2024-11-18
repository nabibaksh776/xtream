import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "@/lib/routes";

// Initialize NextAuth with your authConfig
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.some((route) => {
    // Handle dynamic routes like '/success/[provider]' and '/social/[provider]'
    const regex = new RegExp(`^${route.replace("[provider]", "[^/]+")}$`);
    return regex.test(nextUrl.pathname);
  });

  console.log("isAuthenticated--- ", isAuthenticated);
  console.log("isPublicRoute--- ", isPublicRoute);

  // If the user is authenticated and tries to access a public route, redirect to DEFAULT_REDIRECT
  if (isPublicRoute && isAuthenticated) {
    console.log("working here first condition");
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  // If the user is not authenticated and tries to access a protected route, redirect to ROOT
  if (!isAuthenticated && !isPublicRoute) {
    console.log("working here first 2nd condition");
    return Response.redirect(new URL(ROOT, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
