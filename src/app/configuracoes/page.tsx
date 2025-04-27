"use client";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import React from "react";

const ConfiguracoesPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  return <div>ConfiguracoesPage</div>;
};

export default ConfiguracoesPage;
