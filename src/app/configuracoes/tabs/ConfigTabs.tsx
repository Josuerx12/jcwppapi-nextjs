"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CONFIG_TABS = [
  { label: "Perfil", href: "/configuracoes" },
  { label: "Segurança", href: "/configuracoes/seguranca" },
];

const ConfigsTabs = () => {
  const pathname = usePathname();

  return (
    <Tabs value={pathname} className="w-full">
      <TabsList className="flex gap-2 border-b mb-4">
        {CONFIG_TABS.map((tab) => {
          return (
            <Link key={tab.href} href={tab.href}>
              <TabsTrigger value={tab.href}>{tab.label}</TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default ConfigsTabs;
