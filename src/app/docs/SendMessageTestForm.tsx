"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { InstanceService } from "@/services/InstanceService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import {
  sendMessageSchema,
  SendMessageFormType,
} from "./schemas/send-message.schema";
import { Eye, EyeOff } from "lucide-react";

const SendMessageTestForm = () => {
  const form = useForm<SendMessageFormType>({
    resolver: zodResolver(sendMessageSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["send-message-docs"],
    mutationFn: async (data: SendMessageFormType) => {
      return await InstanceService.sendMessage(
        data.sessionId,
        data.number,
        data.message,
        data.secret
      );
    },
    onError: (e: any) => toast.error(e),
    onSuccess: () => toast.success("Mensagem enviada com sucesso!"),
  });

  const [showSecret, setShowSecret] = React.useState(false);

  async function handleTestSendMessage(data: SendMessageFormType) {
    await mutateAsync(data);
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <h3 className="text-lg font-bold mb-2 text-left w-full text-gray-800">
        Testar sua instancia enviando uma mensagem simples
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleTestSendMessage)}
          className="flex flex-col gap-2 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="sessionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm">
                    ID da Instância
                  </FormLabel>
                  <FormControl>
                    <Input
                      size={8}
                      placeholder="ID da Instância"
                      {...field}
                      className="text-xs md:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm">
                    Token Secreto
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        size={8}
                        placeholder="Token Secreto"
                        {...field}
                        className="text-xs md:text-sm pr-10"
                        type={showSecret ? "text" : "password"}
                      />
                      <button
                        type="button"
                        title="Mostrar/Esconder secret"
                        tabIndex={-1}
                        className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        onClick={() => setShowSecret((v) => !v)}
                        aria-label={
                          showSecret ? "Esconder token" : "Mostrar token"
                        }
                      >
                        {showSecret ? (
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm">Número</FormLabel>
                  <FormControl>
                    <Input
                      size={8}
                      placeholder="Ex: 5511999999999"
                      {...field}
                      className="text-xs md:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm">Mensagem</FormLabel>
                  <FormControl>
                    <Input
                      size={8}
                      placeholder="Mensagem"
                      {...field}
                      className="text-xs md:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 transition-colors duration-300 mt-2 text-sm py-2"
            type="submit"
            disabled={isPending}
          >
            Enviar Mensagem de Teste
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendMessageTestForm;
