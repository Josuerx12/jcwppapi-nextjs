"use client";
import { PreRegisterService } from "@/services/PreRegisterService";
import { useAuthStore } from "@/store/auth.store";
import { UserRoles } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PreRegistersSkeleton from "@/components/loading/PreRegisterSkeleton";
import PreRegisterCard from "@/components/cards/PreRegisterCard";

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
    <div className=" px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Usuários pré-cadastrados</h1>
      <p className="mb-6">
        Aqui estão listados os usuários cadastrados previamente para acesso à
        API.
      </p>

      {isPending ? (
        <PreRegistersSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {data?.map((pre) => (
            <PreRegisterCard key={pre.preRegisterId} preRegister={pre} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPreRegisteredUsersPage;
