"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCcw } from "lucide-react";
import { toast } from "react-toastify";
import ProfileTab from "./tabs/profile.tab";

const ConfiguracoesPage = () => {
  const { user, isPending } = useAuthStore();
  const router = useRouter();

  const [secretToken, setSecretToken] = useState("seu-token-secreto-ficticio");

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending]);

  function handleChangePassword() {
    toast.info("Função de troca de senha ainda será implementada.");
  }

  function handleCopyToken() {
    navigator.clipboard.writeText(secretToken);
    toast.success("Token copiado para a área de transferência!");
  }

  function handleRefreshToken() {
    const newToken = Math.random().toString(36).substring(2);
    setSecretToken(newToken);
    toast.success("Novo token gerado com sucesso!");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-green-600">
        Configurações da Conta
      </h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        {/* TAB PERFIL */}

        <ProfileTab user={user!} />

        {/* TAB SEGURANÇA */}
        <TabsContent value="security">
          <div className="mt-6 flex flex-col gap-8 max-w-2xl">
            {/* Trocar Senha */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Trocar Senha</h2>
              <Button variant="outline" onClick={handleChangePassword}>
                Alterar minha senha
              </Button>
            </div>

            {/* Token Secreto */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Token de Segurança</h2>
              <div className="flex gap-2">
                <Input value={secretToken} readOnly />
                <Button variant="outline" onClick={handleCopyToken}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={handleRefreshToken}>
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-500 text-sm">
                Copie ou gere um novo token para autenticação segura.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesPage;
