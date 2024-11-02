"use server";
import { cookies } from "next/headers";
import { signOut } from "@/auth.config";

const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("authjs.local-token");
  await signOut();
};

export { logout };
