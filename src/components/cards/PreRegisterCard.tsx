"use client";

import { PreRegisterService } from "@/services/PreRegisterService";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PreRegister } from "@/types/pre-register.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

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
    <Card className="transition-shadow shadow-sm hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base">{preRegister.name}</CardTitle>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => approveUser(preRegister.preRegisterId)}
          disabled={isApproving}
        >
          {isApproving ? (
            <p className="flex items-center justify-center gap-2">
              <span>Aprovando cadastro...</span>
              <Loader2 className="animate-spin" size={16} />
            </p>
          ) : (
            <>Aprovar cadastro</>
          )}
        </Button>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{preRegister.email}</p>
        <p className="text-sm text-muted-foreground">
          Documento: {preRegister.document}
        </p>
        <p className="text-sm text-muted-foreground">
          Telefone: {preRegister.phone}
        </p>
      </CardContent>
    </Card>
  );
};

export default PreRegisterCard;
