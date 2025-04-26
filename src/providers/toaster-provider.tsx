"use client";

import { useAuthStore } from "@/store/auth.store";
import React, { ReactNode, useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";

const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default ToasterProvider;
