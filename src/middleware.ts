import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // "/((?!api|_next/static|_next/image|.*\\.png$).*)"
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/products/:path*",
    "/profile/:parth*",
    "/admin/:path*",
    "/cart/:path*",
  ],
};
