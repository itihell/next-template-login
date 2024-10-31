"use server";
import { signIn } from "@/auth.config";
import { getData } from "@/utils";

import { AuthError } from "next-auth";

export async function loginFormData(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    //const a = await signIn("oauth", {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
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
