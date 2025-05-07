"use client";

import { PreRegisterService } from "@/services/PreRegisterService";
import { PreRegister } from "@/types/pre-register.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

const PreRegisterCard = ({ preRegister }: { preRegister: PreRegister }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: approveUser, isPending: isApproving } = useMutation({
    mutationFn: (id: string) => PreRegisterService.approve(id),
    onSuccess: () => {
      toast.success("Usuário aprovado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["pre-registers"] });
    },
    onError: () => {
      toast.error("Erro ao aprovar pré-cadastro.");
    },
  });

  return (
    <div
      key={preRegister.preRegisterId}
      className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
    >
      <div>
        <p className="text-lg font-medium">{preRegister.name}</p>
        <p className="text-sm text-muted-foreground">{preRegister.email}</p>
        <p className="text-sm text-muted-foreground">
          Documento: {preRegister.document}
        </p>
        <p className="text-sm text-muted-foreground">
          Telefone: {preRegister.phone}
        </p>
      </div>
      <Button
        onClick={() => approveUser(preRegister.preRegisterId)}
        disabled={isApproving}
      >
        Aprovar cadastro
      </Button>
    </div>
  );
};

export default PreRegisterCard;
