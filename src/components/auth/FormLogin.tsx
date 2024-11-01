"use client";
import { formSchemaLogin } from "@/schemas";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "../ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createLogin } from "@/actions";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import styles from "./form-login.module.css";
import { useSession } from "next-auth/react";

export const FormLogin = () => {
  const { data: session } = useSession();
  if (session) redirect("/dashboard");
  const router = useRouter();
  const searchParams = useSearchParams();
  const arrayPath = searchParams.get("callbackUrl")?.split("/");

  arrayPath?.splice(0, 3);
  const callbackUrl = arrayPath ? "/" + arrayPath?.join("/") : "/dashboard";

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchemaLogin>) => {
    createLogin(values, callbackUrl);
  };

  const hundlerToHome = () => {
    router.push("/");
  };
  return (
    <div className="m-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <p className="text-center text-xl text-gray-700">
            Ingrese su email y contraseña
          </p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your_email@domain.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="">
            <div className="grid space-x-0 mt-6">
              <Button type="submit" className={`${styles.btnLogin}`}>
                Entrar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
