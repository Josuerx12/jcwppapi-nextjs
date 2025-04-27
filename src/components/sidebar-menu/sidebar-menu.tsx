"use client";

import { useAuthStore } from "@/store/auth.store";
import { useSidebarMenuStore } from "@/store/sidebar-menu.store";
import { Home, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { isOpen } = useSidebarMenuStore();

  if (!user) {
    return null;
  }

  return (
    <aside
      className={clsx(
        "min-h-screen bg-white  drop-shadow transition-all duration-300 ease-in-out overflow-hidden",
        {
          "w-[300px]": isOpen,
          "w-0": !isOpen,
        }
      )}
    >
      {isOpen && (
        <div className="flex flex-col gap-4 p-4">
          <Link
            href="/"
            className={clsx(
              "flex rounded-md transition-all duration-200 items-center gap-2 p-2",
              {
                "bg-gray-900 text-white": pathname === "/",
              }
            )}
          >
            <Home /> Pagina Inicial
          </Link>
          <Link
            href="/dashboard"
            className={clsx(
              "flex rounded-md transition-all duration-200 items-center gap-2 p-2",
              {
                "bg-gray-900 text-white": pathname === "/dashboard",
              }
            )}
          >
            <LayoutDashboard /> Dashboard
          </Link>
          <Link
            href="/configuracoes"
            className={clsx(
              "flex rounded-md transition-all duration-200 items-center gap-2 p-2",
              {
                "bg-gray-900 text-white": pathname === "/configuracoes",
              }
            )}
          >
            <Settings /> Configurações
          </Link>
        </div>
      )}
    </aside>
  );
};

export default SidebarMenu;
