"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { SignUpSchema, SignUpType } from "./schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SignUp } from "@/services/signup.action";
import { toast } from "react-toastify";
import Logo from "@/components/logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  if (user) {
    router.push("/dashboard");
  }

  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  });

  const { isPending, mutateAsync, error } = useMutation({
    mutationKey: ["pre-register"],
    mutationFn: SignUp,
    onError: (e: Error) => {
      console.log(e);
      toast.error(e.message);
    },
    onSuccess() {
      toast.success("Pré-registro realizado com sucesso!");
      router.push("/");
    },
  });

  async function handleSubmit(data: SignUpType) {
    await mutateAsync(data);
  }

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <main className="min-h-screen flex justify-center bg-gray-100 px-4">
      <section className="w-full h-fit mt-10 max-w-md bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800">
            Faça seu Pré-Registro
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Preencha as informações abaixo para se pré-registrar na JCWPPAPI.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seu nome completo"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
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
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Documento</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="mt-1 border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none text-gray-800 dark:bg-input/30"
                    >
                      <option value="" disabled selected>
                        Selecione o tipo
                      </option>
                      <option value="CPF">CPF</option>
                      <option value="CNPJ">CNPJ</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CPF ou CNPJ"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        placeholder="Insira sua senha."
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

            {error && (
              <p className="text-red-600">
                <b className="text-red-900">Error: </b>
                {error.message}
              </p>
            )}

            <Button
              disabled={isPending}
              className="w-full mt-2 bg-green-500 hover:bg-green-600 transition-colors duration-300"
              type="submit"
              title="Fazer Pré-Registro"
            >
              {isPending ? "Enviando..." : "Pré-Registrar"}
            </Button>

            <p className="text-xs text-gray-400 text-center mt-2">
              Já possui cadastro?{" "}
              <span
                className="text-green-500 underline cursor-pointer"
                onClick={() => router.push("/")}
              >
                Entrar
              </span>
            </p>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default SignUpPage;
