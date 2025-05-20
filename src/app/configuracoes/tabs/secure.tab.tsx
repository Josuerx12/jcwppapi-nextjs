import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { UserService } from "@/services/UserService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Copy, RefreshCcw } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SecureTab = () => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["secure-token"],
    queryFn: UserService.getUserSecret,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["renew-user-secret"],
    mutationFn: UserService.renewUserSecret,
    onError: (e: any) => toast.error(e),
    onSuccess: async () => {
      toast.success("Novo token gerado com sucesso!");
      await refetch();
    },
  });

  const [showToken, setShowToken] = useState(false);

  function handleCopyToken() {
    if (!data?.secret) return;
    navigator.clipboard.writeText(data.secret);
    toast.success("Token copiado para a área de transferência!");
  }

  async function handleRefreshToken() {
    await mutateAsync();
  }

  return (
    <TabsContent value="security">
      <div className="mt-6 flex flex-col gap-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 md:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Token de Segurança
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full">
            <Input
              value={data?.secret}
              readOnly
              className="font-mono text-base flex-1 min-w-0"
              type={showToken ? "text" : "password"}
              disabled={isFetching || isPending}
            />
            <div className="flex gap-2 w-full flex-wrap sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setShowToken((v) => !v)}
                title={showToken ? "Esconder token" : "Mostrar token"}
                className="border-gray-300 text-gray-600 hover:bg-gray-50 flex-1"
                type="button"
                disabled={isFetching || isPending}
              >
                {showToken ? "Esconder" : "Mostrar"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyToken}
                title="Copiar token"
                className="border-green-500 text-green-600 hover:bg-green-50 flex-1"
                disabled={!data?.secret || isFetching || isPending}
              >
                <Copy className="w-4 h-4 mr-1" /> Copiar
              </Button>
              <Button
                variant="outline"
                onClick={handleRefreshToken}
                title="Gerar novo token"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 flex-1"
                disabled={isPending}
                type="button"
              >
                <RefreshCcw className="w-4 h-4 mr-1" /> Gerar novo
              </Button>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Copie ou gere um novo token para autenticação segura. Guarde este
            token em local seguro.
          </p>
        </div>
      </div>
    </TabsContent>
  );
};

export default SecureTab;
