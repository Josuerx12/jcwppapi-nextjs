import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { User } from "@/types/user.type";
import { Pen, PenOff, Save, KeyRound } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "@/services/UserService";
import { toast } from "react-toastify";
import ChangePasswordModal from "@/components/dialogs/ChangePasswordModal";

const profileSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  document: z.string().min(3, "Documento obrigatório"),
});

type ProfileFormType = z.infer<typeof profileSchema>;

const ProfileTab = ({ user }: { user: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      document: user.document,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["update-user-profile"],
    mutationFn: UserService.updateUser,
    onError: (e: any) => toast.error(e),
    onSuccess: () => {
      toast.success("Dados atualizados com sucesso!");
      setIsEditing(false);
    },
  });

  async function handleSubmit(data: ProfileFormType) {
    await mutateAsync({ userId: user.userId, ...data });
  }

  return (
    <TabsContent value="profile">
      <div className="mt-6 flex flex-col gap-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex w-full gap-y-2 flex-wrap justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">Meus Dados</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenChangePassword(true)}
              title="Alterar senha"
            >
              <KeyRound className="w-4 h-4 mr-1" /> Alterar senha
            </Button>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} title="Editar">
                <Pen className="w-4 h-4 mr-1" /> Editar
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
                title="Cancelar"
              >
                <PenOff className="w-4 h-4 mr-1" /> Cancelar
              </Button>
            )}
          </div>
        </div>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <Input
              {...form.register("name")}
              placeholder="Nome"
              disabled={!isEditing || isPending}
              className="mt-1"
            />
            {form.formState.errors.name && (
              <span className="text-xs text-red-500">
                {form.formState.errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <Input
              {...form.register("email")}
              placeholder="Email"
              disabled={!isEditing || isPending}
              className="mt-1"
            />
            {form.formState.errors.email && (
              <span className="text-xs text-red-500">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Documento
            </label>
            <Input
              {...form.register("document")}
              placeholder="Documento"
              disabled={!isEditing || isPending}
              className="mt-1"
            />
            {form.formState.errors.document && (
              <span className="text-xs text-red-500">
                {form.formState.errors.document.message}
              </span>
            )}
          </div>
          {isEditing && (
            <Button
              className="mt-4 w-full bg-green-500 hover:bg-green-600 transition-colors duration-300"
              type="submit"
              disabled={isPending}
              title="Salvar Alterações"
            >
              <Save className="w-4 h-4 mr-1" /> Salvar Alterações
            </Button>
          )}
        </form>
      </div>
      <ChangePasswordModal
        open={openChangePassword}
        handleClose={() => setOpenChangePassword(false)}
      />
    </TabsContent>
  );
};

export default ProfileTab;
