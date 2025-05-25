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
import {
  forgotPasswordSchema,
  ForgotPasswordFormType,
} from "./schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/UserService";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForgetPasswordPage = () => {
  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: UserService.requestPasswordReset,
    onError: (e: any) => toast.error(e),
    onSuccess() {
      toast.success(
        "Se os dados informados estiverem corretos, enviaremos instruções para recuperação de senha."
      );
      router.push("/");
      form.reset();
    },
  });

  async function handleSubmit(data: ForgotPasswordFormType) {
    await mutateAsync(data);
  }

  return (
    <main className="min-h-screen flex justify-center bg-gray-100 px-4">
      <section className="w-full h-fit mt-10 max-w-md bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800">Recuperar acesso</h1>
          <p className="text-sm text-gray-500 text-center">
            Informe seu CPF, CNPJ ou e-mail para receber as instruções de
            recuperação de senha.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF, CNPJ ou E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu CPF, CNPJ ou e-mail"
                      {...field}
                      className="mt-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              className="w-full mt-2 bg-green-500 hover:bg-green-600 transition-colors duration-300"
              type="submit"
              title="Recuperar senha"
            >
              Recuperar senha
            </Button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Lembrou sua senha?{" "}
              <Link
                href="/auth/login"
                className="text-green-500 underline cursor-pointer"
              >
                Fazer login
              </Link>
            </p>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default ForgetPasswordPage;
