import NextAuth, { DefaultSession } from "next-auth";
import { Permission, Role } from "./interfaces";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      roles: Role[];
      permissions: Permission[];
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    permissions: Permission[];
    accessToken: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
