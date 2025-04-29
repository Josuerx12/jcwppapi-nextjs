import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { User } from "@/types/user.type";
import { Pen } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ProfileTab = ({ user }: { user: User }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { register } = useForm<User>({
    defaultValues: user,
  });

  return (
    <TabsContent value="profile">
      <div className="mt-6 flex flex-col gap-4 max-w-2xl">
        <div className="flex w-full justify-end">
          <Button onClick={() => setIsEditing((prev) => !prev)}>
            Editar <Pen />
          </Button>
        </div>
        <Input {...register("name")} placeholder="Nome" disabled={!isEditing} />
        <Input
          {...register("email")}
          placeholder="Email"
          disabled={!isEditing}
        />
        <Input
          {...register("phone")}
          placeholder="Telefone"
          disabled={!isEditing}
        />
        <Input
          {...register("document")}
          placeholder="Documento"
          disabled={!isEditing}
        />
        {isEditing && <Button className="mt-4">Salvar Alterações</Button>}
      </div>
    </TabsContent>
  );
};

export default ProfileTab;
