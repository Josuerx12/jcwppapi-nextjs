"use client";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { user } = useAuthStore();

  const router = useRouter();

  if (!user) {
    router.push("/login");
  }
  return <div>DashboardPage</div>;
};

export default DashboardPage;
