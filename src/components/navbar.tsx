"use client";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Home, LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="w-full p-4 border-b-2 shadow flex justify-between items-center">
      <Logo />

      <nav className="flex gap-4">
        <Link
          className="md:flex hidden items-center gap-2 duration-100 md:hover:bg-gray-300 p-2"
          href={"/"}
        >
          <Home size={16} /> Pagina Inicial
        </Link>
        {user ? (
          <button
            onClick={logout}
            className="flex items-center gap-2 duration-100 md:hover:bg-gray-300 p-2"
            type="button"
          >
            Sair <LogOut size={16} />
          </button>
        ) : (
          <Link
            className="flex items-center gap-2 duration-100 md:hover:bg-gray-300 p-2"
            href={"/login"}
          >
            Entrar <LogIn size={16} />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
