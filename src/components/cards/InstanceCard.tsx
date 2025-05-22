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
import {
  Loader2,
  Trash,
  CheckCircle,
  AlertTriangle,
  User2,
  Globe,
  Clock,
  RefreshCcw,
} from "lucide-react";
import { toast } from "react-toastify";
import InstanceSkeleton from "../loading/InstanceSkeleton";

const InstanceCard = ({ instance }: { instance: Instance }) => {
  const queryClient = useQueryClient();

  const { data, isPending, refetch, isRefetching } = useQuery({
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

  async function handleDeleteInstance() {
    if (!confirm("Você tem certeza que deseja deletar esta instância?")) return;
    await deleteInstance();
  }

  return (
    <Card className="transition-shadow shadow-md hover:shadow-xl">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base flex items-center gap-2">
            Instância: <span className="font-mono">{instance.instanceId}</span>
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-1 text-sm">
            {isConnected ? (
              <>
                <CheckCircle className="text-green-600" size={16} />
                <span className="font-semibold text-green-700">Conectada</span>
              </>
            ) : (
              <>
                <AlertTriangle className="text-yellow-500" size={16} />
                <span className="font-semibold text-yellow-700">
                  Aguardando conexão
                </span>
              </>
            )}
          </CardDescription>
        </div>
        <div>
          <Button
            size="icon"
            variant="ghost"
            title={
              "Atualizar ou gerar novo QR Code para conexão da instância ID: " +
              instance.instanceId
            }
            onClick={() => refetch()}
            disabled={isPending || isRefetching}
          >
            {isPending || isRefetching ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <RefreshCcw className="text-gray-700" size={16} />
            )}
          </Button>
          <Button
            size="icon"
            title={"Deletar instância ID: " + instance.instanceId}
            variant="ghost"
            onClick={() => handleDeleteInstance()}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Trash className="text-red-500" size={16} />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {isConnected ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {data!.avatarUrl ? (
                <img
                  src={data!.avatarUrl}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border"
                />
              ) : (
                <User2 className="w-12 h-12 text-gray-400" />
              )}
              <div>
                <div className="font-semibold text-base">
                  {data?.profile?.name || "Nome não disponível"}
                </div>
                <div className="text-xs text-muted-foreground">
                  ID: {data?.profile?.id || "N/A"}
                </div>
                <div className="text-xs text-muted-foreground">
                  LID: {data?.profile?.lid || "N/A"}
                </div>
              </div>
            </div>
            {data?.bussinessProfile && (
              <div className="mt-2 border-t pt-2">
                <div className="flex items-center gap-2 text-sm mb-1">
                  <Globe size={16} className="text-blue-500" />
                  <span className="font-medium">Perfil Comercial</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Categoria: {data?.bussinessProfile.category || "N/A"}
                </div>
                {data?.bussinessProfile.website &&
                  data?.bussinessProfile.website.length > 0 && (
                    <div className="text-xs text-muted-foreground mb-1">
                      Website:{" "}
                      {data?.bussinessProfile.website.map((w, i) => (
                        <a
                          key={w}
                          href={w}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-600 mr-1"
                        >
                          {w}
                          {i < data.bussinessProfile!.website.length - 1
                            ? ","
                            : ""}
                        </a>
                      ))}
                    </div>
                  )}
                <div className="text-xs text-muted-foreground mb-1">
                  Descrição: {data.bussinessProfile.description || "N/A"}
                </div>
                {data.bussinessProfile.business_hours && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={14} className="text-gray-500" />
                    <span>
                      Horário: {data.bussinessProfile.business_hours.timezone}
                    </span>
                  </div>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Esta instância está ativa e conectada ao WhatsApp.
            </p>
          </div>
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
