import { MessageCircle } from "lucide-react";
import Link from "next/link";

import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/"}
      title="Ir para pagina inicial"
      className="flex gap-2 items-center bg-green-500 hover:scale-105 duration-200 cursor-pointer text-white w-fit py-2 px-3 rounded-md shadow shadow-green-500"
    >
      <MessageCircle size={32} />
      <h2 className="text-xl font-semibold">JCWPPAPI</h2>
    </Link>
  );
};

export default Logo;
