import NextAuth, { type NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginData } from "./interfaces";
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    // async signIn({ user }) {
    //   const locaToken = (user as { token: string }).token;
    //   if (locaToken) return true;
    //   return false;
    // },
    async session({ session, token }) {
      console.log("session", { session, token });
      if (token.accessToken) {
        // session.user = token.data;
        // session.sessionToken = token.accessToken;
        // session.user.accessToken = token.accessToken;
        session.sessionToken = token.accessToken as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      const cookieStore = await cookies();

      if (user) {
        const { id, name, email, roles, permissions, accessToken } = user;

        console.log(user.accessToken);

        token.accessToken = accessToken;
        token.sessionToken = accessToken;
        token.email = email;
        token.name = name;
        token.data = {
          id,
          name,
          email,
          roles,
          permissions,
        };

        cookieStore.set("authjs.local-token", accessToken, {
          maxAge: 8 * 60 * 60 * 1000, // 8 horas
        });
      }
      return token;
    },
    // async authorized({ auth, request: { nextUrl } }) {
    //   try {
    //     console.log("authorized");

    //     const isLoggedIn = !!auth?.user;

    //     const isOnDashboard = nextUrl.pathname.startsWith("/checkout");

    //     if (isLoggedIn) return true;
    //     return false;
    //   } catch (error) {
    //     console.error("autorized", { error });
    //   }
    // },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { callbackUrl, ...body } = credentials;

        const url = `${process.env.BASE_URL}${process.env.AUTH0_ACCESS_TOKEN_URL}`;
        // credentials.grant_type = "password";
        // credentials.client_id = process.env.AUTH0_CLIENT_ID;
        // credentials.client_secret = process.env.AUTH0_CLIENT_SECRET;

        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = (await res.json()) as LoginData;

        if (data.accessToken) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
});
