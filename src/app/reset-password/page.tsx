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
  resetPasswordSchema,
  ResetPasswordFormType,
} from "./schemas/reset-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/UserService";
import { useRouter, useSearchParams } from "next/navigation";

const ResetarSenhaPage = () => {
  const searchParams = useSearchParams();
  const codeFromQuery = searchParams.get("code") || "";

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: codeFromQuery },
  });

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: UserService.resetPassword,
    onError: (e: any) => {
      toast.error(e);
    },
    onSuccess() {
      toast.success(
        "Senha redefinida com sucesso! Faça login com sua nova senha."
      );
      router.push("/login");
      form.reset();
    },
  });

  async function handleSubmit(data: ResetPasswordFormType) {
    await mutateAsync(data);
  }

  return (
    <main className="min-h-screen flex justify-center bg-gray-100 px-4">
      <section className="w-full h-fit mt-10 max-w-md bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800">Redefinir senha</h1>
          <p className="text-sm text-gray-500 text-center">
            Informe o código recebido e defina sua nova senha.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de recuperação</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o código recebido"
                      {...field}
                      value={field.value ?? codeFromQuery}
                      className="mt-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nova senha"
                      type="password"
                      {...field}
                      className="mt-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme a nova senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme a nova senha"
                      type="password"
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
              title="Redefinir senha"
            >
              Redefinir senha
            </Button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Lembrou sua senha?{" "}
              <a
                href="/login"
                className="text-green-500 underline cursor-pointer"
              >
                Fazer login
              </a>
            </p>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default ResetarSenhaPage;
