"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DASHBOARD_TABS = [
  { label: "Instâncias", href: "/dashboard" },
  { label: "Usuários pré-cadastrados", href: "/dashboard/users" },
];

const DashboardTabs = () => {
  const pathname = usePathname();

  return (
    <Tabs value={pathname} className="w-full">
      <TabsList className="flex gap-2 border-b mb-4">
        {DASHBOARD_TABS.map((tab) => (
          <Link key={tab.href} href={tab.href}>
            <TabsTrigger value={tab.href}>{tab.label}</TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default DashboardTabs;
