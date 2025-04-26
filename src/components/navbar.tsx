import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Home, LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full p-4 border-b-2 shadow flex justify-between items-center bg-slate-50">
      <Logo />

      <nav className="flex gap-4">
        <Link
          className="md:flex hidden items-center gap-2 duration-100 md:hover:bg-gray-300 p-2"
          href={"/"}
        >
          <Home size={16} /> Pagina Inicial
        </Link>
        <Link
          className="flex items-center gap-2 duration-100 md:hover:bg-gray-300 p-2"
          href={"/login"}
        >
          Entrar <LogIn size={16} />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
