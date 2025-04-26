import { MessageCircle } from "lucide-react";
import Link from "next/link";

import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      title="Ir para página inicial"
      className="flex items-center gap-3 bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-200 cursor-pointer text-white w-fit py-2 px-4 rounded-lg shadow-md shadow-green-400"
    >
      <MessageCircle size={30} className="text-white" />
      <h1 className="text-2xl font-bold tracking-wide">JCWPP</h1>
    </Link>
  );
};

export default Logo;
