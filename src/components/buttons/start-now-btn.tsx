"use client";

import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import React from "react";

const StartNowBtn = () => {
  const { user } = useAuthStore();

  return (
    <Link
      href={user ? "/dashboard" : "/signup"}
      className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
    >
      {user ? "Ir para dashboard" : "Comece Agora"}
    </Link>
  );
};

export default StartNowBtn;
