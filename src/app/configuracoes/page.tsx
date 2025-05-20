"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "./tabs/profile.tab";
import SecureTab from "./tabs/secure.tab";

const ConfiguracoesPage = () => {
  const { user, isPending } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending]);

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

        <SecureTab />
      </Tabs>
    </div>
  );
};

export default ConfiguracoesPage;
