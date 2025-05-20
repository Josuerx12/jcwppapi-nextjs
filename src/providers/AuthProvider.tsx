"use client";
import Logo from "@/components/logo";
import { useAuthStore } from "@/store/auth.store";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { initAuth, isPending } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-6 h-screen">
        <Logo />

        <h3 className="text-2xl font-bold uppercase">
          Aguarde carregando dados...
        </h3>

        <svg
          className="animate-spin h-10 w-10 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="4"
            stroke="currentColor"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4.93 4.93a10 10 0 0114.14 14.14l1.41 1.41a12 12 0 00-16.97-16.97l1.42 1.42z"
          />
        </svg>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
