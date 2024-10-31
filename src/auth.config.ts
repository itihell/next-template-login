import NextAuth, { type NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
import Credentials from "next-auth/providers/credentials";
import { getPerfilUser } from "./actions";
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const locaToken = (user as { access_token: string }).access_token;
      if (locaToken) return true;
      return false;
    },
    async session({ session, token, user }) {
      if (token.accessToken) {
        session.user = token.data as any;
        session.sessionToken = token.accessToken as any;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const cookieStore = cookies();

      if (user) {
        const locaToken = (user as { access_token: string }).access_token;

        const { id, name, email, url_foto, activo, roles, changepass } =
          await getPerfilUser(locaToken);

        token.accessToken = locaToken;
        token.email = email;
        token.name = name;
        token.picture = url_foto;
        token.data = {
          id,
          name,
          email,
          url_foto,
          activo,
          roles,
          changepass,
        };

        cookieStore.set("authjs.local-token", locaToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 días
        });
      }
      return token;
    },
    async authorized({ auth, request: { nextUrl } }) {
      try {
        const isLoggedIn = !!auth?.user;

        const isOnDashboard = nextUrl.pathname.startsWith("/checkout");

        if (isLoggedIn) return true;
        return false;
      } catch (error) {
        console.error("autorized", { error });
      }
    },
  },

  providers: [
    Credentials({
      async authorize(credentials, req) {
        const url = `${process.env.BASE_URL}${process.env.AUTH0_ACCESS_TOKEN_URL}`;
        credentials.grant_type = "password";
        credentials.client_id = process.env.AUTH0_CLIENT_ID;
        credentials.client_secret = process.env.AUTH0_CLIENT_SECRET;

        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.access_token) {
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
