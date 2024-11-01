import NextAuth, { type NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
import CredentialsProvider from "next-auth/providers/credentials";
import { CustomUserAdapter } from "./interfaces";

import jwt from "jsonwebtoken";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (user.accessToken) return true;
      return false;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        const adapaterUser = token.data as CustomUserAdapter;
        session.user = {
          ...adapaterUser,
        };
        session.sessionToken = token.accessToken as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      const cookieStore = await cookies();

      if (user) {
        const { exp, iat } = jwt.decode(user.accessToken) as {
          exp: number;
          iat: number;
        };
        const { id, name, email, roles, permissions, accessToken } = user;

        token.iat = iat;
        token.exp = exp;

        token.accessToken = accessToken;
        token.email = email;
        token.name = name;
        token.id = id;
        token.data = {
          id,
          name,
          email,
          roles,
          permissions,
        };
        const expires = new Date(exp * 1000).toLocaleDateString();
        cookieStore.set("authjs.local-token", accessToken, {
          maxAge: 4 * 60 * 60, // 4 horas en segundos,
          expires: new Date(expires),
        });

        return token;
      }
      return token;
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      return !!auth?.user;
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { callbackUrl, ...body } = credentials;

        const url = `${process.env.BASE_URL}${process.env.AUTH0_ACCESS_TOKEN_URL}`;

        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = (await res.json()) as CustomUserAdapter;

        if (user.accessToken) {
          return {
            ...user,
            emailVerified: user.emailVerified
              ? new Date(user.emailVerified)
              : null,
          } as CustomUserAdapter;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 horas
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
});
