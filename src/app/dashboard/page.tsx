"use client";

import InstanceCard from "@/components/cards/InstanceCard";
import CreateInstanceModal from "@/components/dialogs/CreateInstanceModal";
import InstanceLoadingSkeleton from "@/components/loading/InstanceLoadingSkeleton";
import { Button } from "@/components/ui/button";
import { InstanceService } from "@/services/InstanceService";
import { useAuthStore } from "@/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [isAdding, setIsAdding] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const { data, isPending } = useQuery({
    queryKey: ["instances"],
    queryFn: InstanceService.getAll,
  });

  if (isPending) {
    return <InstanceLoadingSkeleton />;
  }

  return (
    <div>
      <CreateInstanceModal
        isOpen={isAdding}
        handleOpen={() => setIsAdding((prev) => !prev)}
      />
      <h1 className="text-2xl font-semibold mb-4">Minhas Instâncias</h1>
      <div className="w-full flex justify-end">
        <Button
          className="cursor-pointer"
          variant={"outline"}
          onClick={() => setIsAdding((prev) => !prev)}
        >
          Adicionar Instancia
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-y-4">
        {data?.instances && data.instances.length > 0 ? (
          data.instances.map((i) => (
            <InstanceCard instance={i} key={i.instanceId} />
          ))
        ) : (
          <p>Nenhuma instancia criada, crie uma para poder gerenciar.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
