import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Instance } from "@/types/instance.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InstanceService } from "@/services/InstanceService";
import { Loader2, Trash, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import InstanceSkeleton from "../loading/InstanceSkeleton";

const InstanceCard = ({ instance }: { instance: Instance }) => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["instance" + instance.instanceId],
    queryFn: () =>
      InstanceService.connectOrCreate({
        instanceId: instance.instanceId,
      }),
  });

  const { mutateAsync: deleteInstance, isPending: isDeleting } = useMutation({
    mutationFn: () => InstanceService.delete(instance.instanceId),
    onSuccess: () => {
      toast.success("Instância deletada com sucesso.");
      queryClient.invalidateQueries({
        queryKey: ["instance" + instance.instanceId],
      });
      queryClient.invalidateQueries({ queryKey: ["instances"] });
    },
    onError: () => {
      toast.error("Erro ao deletar instância.");
    },
  });

  if (isPending) {
    return <InstanceSkeleton />;
  }

  const isConnected = !data?.qrCode;

  return (
    <Card className="transition-shadow shadow-md hover:shadow-xl">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base">
            Instância: {instance.instanceId}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-1 text-sm">
            {isConnected ? (
              <>
                <CheckCircle className="text-green-600" size={16} />
                Conectada
              </>
            ) : (
              <>
                <AlertTriangle className="text-yellow-500" size={16} />
                Aguardando conexão
              </>
            )}
          </CardDescription>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => deleteInstance()}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Trash className="text-red-500" size={16} />
          )}
        </Button>
      </CardHeader>

      <CardContent>
        {isConnected ? (
          <p className="text-sm text-muted-foreground">
            Esta instância está ativa e conectada ao WhatsApp.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm">Escaneie o QR Code abaixo para conectar:</p>
            <img
              src={data.qrCode}
              alt="QR Code para conectar com a instância."
              className="w-40 h-40"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstanceCard;
