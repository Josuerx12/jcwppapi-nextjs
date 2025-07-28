"use client";

import UserDashboardCard from "@/components/cards/UserDashboardCard";
import PreRegistersSkeleton from "@/components/loading/PreRegisterListSkeleton";
import { UserService } from "@/services/UserService";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardUsersPage = () => {
  const { isPending, data } = useQuery({
    queryKey: ["list-users"],
    queryFn: UserService.getAll,
  });

  const { user, isPending: isLoading } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth/login");
    }
  }, [user, router, isLoading]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Usuários</h1>
      <p className="mb-6">
        Aqui estão listados os usuários cadastrados para acesso à API.
      </p>

      {isPending ? (
        <PreRegistersSkeleton />
      ) : (
        <div className="flex flex-col gap-6">
          {data?.map((u) => (
            <UserDashboardCard key={u.userId} user={u} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardUsersPage;
