"use server";
import { z } from "zod";
import { signIn } from "@/auth.config";

import { AuthError } from "next-auth";
import { formSchemaLogin } from "@/schemas";

//export async function createLogin(payload: FormData) {
export async function createLogin(
  payload: z.infer<typeof formSchemaLogin>,
  callbackUrl: string
) {
  try {
    //const a = await signIn("oauth", {
    await signIn("credentials", {
      ...payload,
      redirectTo: callbackUrl,
      redirect: true,
    });

    //console.error({ a });

    return "Success";
  } catch (error) {
    // console.log({ error });

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Las credenciales no son correctas.";
        default:
          return "Algo salió mal. Por favor intenta de nuevo.";
      }
    }

    throw error;
  }
}
