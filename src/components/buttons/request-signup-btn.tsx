"use client";

import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import React from "react";

const RequestSignupBtn = () => {
  const { user } = useAuthStore();
  return (
    <Link
      href={user ? "/dashboard" : "/signup"}
      className="bg-white text-green-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all"
    >
      {user ? "Ir para dashboard" : "Solicitar Cadastro"}
    </Link>
  );
};

export default RequestSignupBtn;
