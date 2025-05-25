"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileConfig from "./tabs/ProfileConfig";

const ConfiguracoesPage = () => {
  const { user, isPending } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending, router]);

  return (
    <div className="p-8">
      <ProfileConfig user={user!} />
    </div>
  );
};

export default ConfiguracoesPage;
