"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { InstanceService } from "@/services/InstanceService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BadgePlus } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { useInstanceSSE } from "@/hooks/useInstanceSSE";

type Props = {
  isOpen: boolean;
  handleOpen: VoidFunction;
};

const CreateInstanceModal = ({ handleOpen, isOpen }: Props) => {
  const query = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);

  const { mutateAsync, isPending, data, reset } = useMutation({
    mutationFn: InstanceService.connectOrCreate,
    mutationKey: ["create-instance"],
    onSuccess: () => {
      toast.info("Instância criada. Aguardando conexão via QR code...");
    },
  });

  // Inicia SSE listener quando `data?.sessionId` existe
  useInstanceSSE(data?.sessionId || "", async () => {
    if (!isConnected) {
      setIsConnected(true);
      toast.success("Instância conectada com sucesso!");
      await query.invalidateQueries({ queryKey: ["instances"] });
      handleOpen();
      reset();
    }
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsConnected(false);
        handleOpen();
        reset();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Adicionar uma nova instancia</DialogTitle>
        {!data && (
          <>
            <BadgePlus size={140} className="text-green-600 mx-auto" />
            <p>Tem certeza que deseja criar uma nova instancia?</p>
            <DialogFooter>
              <Button
                className="w-full! cursor-pointer"
                disabled={isPending}
                onClick={() => mutateAsync({})}
              >
                Confirmar
              </Button>
            </DialogFooter>
          </>
        )}

        {data && (
          <div className="w-full">
            <h2 className="text-center font-semibold">
              Para finalizar a criação da instância, conecte com o WhatsApp via
              QR code abaixo.
            </h2>

            <img
              className="w-48 h-48 mx-auto"
              src={data.qrCode}
              alt="QR Code para conectar com a instância do WhatsApp."
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateInstanceModal;
