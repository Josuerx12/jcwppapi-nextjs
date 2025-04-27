"use client";

import { useSidebarMenuStore } from "@/store/sidebar-menu.store";
import React from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const SidebarBtnToggle = () => {
  const { user } = useAuthStore();
  const { handleOpen, isOpen } = useSidebarMenuStore();

  if (!user) {
    return null;
  }
  return (
    <button
      title="Botão para abrir e fechar a menu sidebar."
      type="button"
      className="cursor-pointer p-2"
      onClick={handleOpen}
    >
      {isOpen ? <X /> : <Menu />}
    </button>
  );
};

export default SidebarBtnToggle;
