"use server";
import { cookies } from "next/headers";
import { signOut } from "@/auth.config";
import { redirect } from "next/navigation";

const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("authjs.local-token");
  await signOut();

  redirect("/");
};

export { logout };
