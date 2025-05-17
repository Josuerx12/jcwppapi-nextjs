import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserService } from "@/services/UserService";

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Senha atual obrigatória."),
  newPassword: z
    .string()
    .min(6, "A nova senha deve ter pelo menos 6 caracteres."),
});

type ChangePasswordFormType = z.infer<typeof changePasswordSchema>;

interface ChangePasswordModalProps {
  open: boolean;
  handleClose: VoidFunction;
}

const ChangePasswordModal = ({
  open,
  handleClose,
}: ChangePasswordModalProps) => {
  const form = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: UserService.changePassword,
    onError: (e: any) => toast.error(e),
    onSuccess() {
      toast.success("Senha alterada com sucesso! Refaça o login.");
      handleClose();
      form.reset();
    },
  });

  async function handleSubmit(data: ChangePasswordFormType) {
    await mutateAsync(data);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleClose();
        form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha atual</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha atual"
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a nova senha"
                      type="password"
                      {...field}
                      className="mt-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isPending}
                className="w-full bg-green-500 hover:bg-green-600 transition-colors duration-300"
                type="submit"
                title="Alterar senha"
              >
                Alterar senha
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
