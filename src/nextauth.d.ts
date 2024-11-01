import NextAuth, { DefaultSession } from "next-auth";
import { Permission, Role } from "./interfaces";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    name: string | null | undefined;
    email: string;
    roles: Role[];
    permissions: Permission[];
    accessToken: string;
    role: string;
    emailVerified?: Date | null;
  }
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
