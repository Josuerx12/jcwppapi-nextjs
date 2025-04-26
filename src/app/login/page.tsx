"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { loginFormType, loginSchema } from "./schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const LoginPage = () => {
  const form = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
  });

  function handleSubmit(data: loginFormType) {
    console.log(data);
  }

  return (
    <main className=" w-full mt-4">
      <section className="max-w-xl border p-3 rounded shadow flex flex-col gap-4 mx-auto">
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <p className="text-gray-500">
            Autentique-se para acessar todos os recursos.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mt-4">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-2"
                        placeholder="johndoe@email.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mt-4">Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-2"
                        placeholder="*********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button
              className="mt-4 cursor-pointer"
              title="Fazer login"
              type="submit"
            >
              Entrar
            </Button>
          </Form>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
