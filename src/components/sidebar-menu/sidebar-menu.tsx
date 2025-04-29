"use client";

import { useAuthStore } from "@/store/auth.store";
import { useSidebarMenuStore } from "@/store/sidebar-menu.store";
import { BookText, Home, LayoutDashboard, Settings, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SidebarMenu = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { isOpen, handleOpen } = useSidebarMenuStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768;

      if (isMobile && isOpen) {
        handleOpen();
      }
    }
  }, []);

  if (!user) {
    return null;
  }

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      handleOpen();
    }
  };

  return (
    <aside
      className={clsx(
        "h-screen bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden",
        "md:relative",
        {
          "fixed inset-0 z-50 w-full": isOpen && window.innerWidth < 768,
          "w-[300px]": isOpen && window.innerWidth >= 768,
          "w-0": !isOpen,
        }
      )}
    >
      {isOpen && (
        <div className="flex flex-col gap-4 p-4">
          <button
            type="button"
            onClick={handleOpen}
            className="md:hidden flex items-center p-2 text-lg gap-2"
          >
            <X /> Fechar Menu
          </button>
          <Link
            onClick={handleLinkClick}
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
            onClick={handleLinkClick}
            href="/dashboard"
            className={clsx(
              "flex rounded-md transition-all duration-200 items-center gap-2 p-2",
              {
                "bg-gray-900 text-white": pathname.includes("dashboard"),
              }
            )}
          >
            <LayoutDashboard /> Dashboard
          </Link>
          <Link
            onClick={handleLinkClick}
            href="/docs"
            className={clsx(
              "flex rounded-md transition-all duration-200 items-center gap-2 p-2",
              {
                "bg-gray-900 text-white": pathname.includes("docs"),
              }
            )}
          >
            <BookText /> Documentação
          </Link>
          <Link
            onClick={handleLinkClick}
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
