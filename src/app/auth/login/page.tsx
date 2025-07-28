"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginFormType, loginSchema } from "./schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();

  const { user, login } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const form = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const { isPending, mutateAsync, error } = useMutation({
    mutationKey: ["auth-user"],
    mutationFn: login,
    onError: (e: Error) => toast.error(e.message),
    onSuccess() {
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    },
  });

  async function handleSubmit(data: loginFormType) {
    await mutateAsync(data);
  }

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <main className="min-h-screen flex  justify-center bg-gray-100 px-4">
      <section className="w-full h-fit mt-10 max-w-md bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Autentique-se para acessar todos os recursos do JCWPP.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      {...field}
                      type="email"
                      className="mt-1"
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
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        placeholder="********"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="mt-1 pr-10"
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        title="Mostrar/Esconder senha"
                        className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Esconder senha" : "Mostrar senha"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(error as any)?.response?.data?.message && (
              <p className="bg-red-700 text-white p-2 rounded">
                {(error as any)?.response?.data.message}
              </p>
            )}

            <Button
              disabled={isPending}
              className="w-full mt-2 bg-green-500 hover:bg-green-600 transition-colors duration-300"
              type="submit"
              title="Fazer login"
            >
              Entrar
            </Button>

            <p className="text-xs text-gray-400 text-center mt-2">
              Esqueceu sua senha?{" "}
              <Link
                href={"/auth/esqueci-senha"}
                className="text-green-500 underline cursor-pointer"
              >
                Recuperar
              </Link>
            </p>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default LoginPage;
