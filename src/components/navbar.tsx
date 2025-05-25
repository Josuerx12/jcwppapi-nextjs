"use client";
import React, { useEffect } from "react";
import Logo from "./logo";
import Link from "next/link";
import { BookText, Home, LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import SidebarBtnToggle from "./sidebar-menu/sidebar-btn-toggle";

const Navbar = () => {
  const { user, logout, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className="w-full p-4 border-b-2 shadow flex justify-between items-center bg-white">
      <div className="flex items-center gap-4">
        <SidebarBtnToggle />
        <Logo />
      </div>

      <nav className="flex gap-2 md:gap-4">
        {user ? (
          <button
            onClick={logout}
            className="flex items-center cursor-pointer gap-2 duration-100 md:hover:bg-gray-300 md:rounded px-2 py-1"
            type="button"
          >
            Sair <LogOut size={16} />
          </button>
        ) : (
          <>
            {" "}
            <Link
              className="md:flex hidden items-center gap-2 duration-100 md:hover:bg-gray-300 md:rounded px-2 py-1"
              href={"/"}
            >
              <Home size={16} /> Pagina Inicial
            </Link>
            <Link
              className="flex items-center gap-2 duration-100 md:hover:bg-gray-300 md:rounded sxm: py-1 px-2"
              href={"/docs"}
            >
              <BookText size={16} /> Docs
            </Link>
            <Link
              className="flex items-center gap-2 duration-100 md:hover:bg-gray-300 md:rounded sxm: py-1 px-2"
              href={"/auth/login"}
            >
              Entrar <LogIn size={16} />
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
