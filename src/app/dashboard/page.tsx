"use client";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { user } = useAuthStore();

  const router = useRouter();

  if (!user) {
    router.push("/login");
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Minhas Instâncias</h1>
      <p>
        Aqui você pode ver e gerenciar suas instâncias do WhatsApp conectadas à
        API JCWPP.
      </p>
    </div>
  );
};

export default DashboardPage;
