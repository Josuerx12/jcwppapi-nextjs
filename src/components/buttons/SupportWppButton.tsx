import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const SupportWppButton = () => {
  return (
    <Link
      href="https://wa.me/5522997979633"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-6 right-6 bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center gap-2 px-4 py-3 rounded-full transition-colors duration-200 text-base font-semibold shadow shadow-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 border-2 border-white"
      title="Suporte via WhatsApp"
    >
      <MessageCircle className="w-5 h-5 text-white" /> Suporte
    </Link>
  );
};

export default SupportWppButton;
