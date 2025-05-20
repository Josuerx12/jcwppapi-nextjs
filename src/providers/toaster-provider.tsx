"use client";

import { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";

const ToasterProvider = ({ children }: { children: ReactNode }) => {
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
