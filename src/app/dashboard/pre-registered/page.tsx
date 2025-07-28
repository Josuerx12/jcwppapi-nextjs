"use client";
import { PreRegisterService } from "@/services/PreRegisterService";
import { useAuthStore } from "@/store/auth.store";
import { UserRoles } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PreRegisterCard from "@/components/cards/PreRegisterCard";
import PreRegisterListSkeleton from "@/components/loading/PreRegisterListSkeleton";

const DashboardPreRegisteredUsersPage = () => {
  const { user, isPending: isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    } else if (user?.role === UserRoles.USER) {
      router.push("/");
    }
  }, [user, router, isLoading]);

  const { isPending, data } = useQuery({
    queryKey: ["pre-registers"],
    queryFn: PreRegisterService.getAll,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Usuários pré-cadastrados</h1>
      <p className="mb-6">
        Aqui estão listados os usuários cadastrados previamente para acesso à
        API.
      </p>

      {isPending ? (
        <PreRegisterListSkeleton />
      ) : (
        <div className="flex flex-col gap-6">
          {data?.data.map((pre) => {
            console.log(pre);
            return <PreRegisterCard key={pre.id} preRegister={pre} />;
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPreRegisteredUsersPage;
