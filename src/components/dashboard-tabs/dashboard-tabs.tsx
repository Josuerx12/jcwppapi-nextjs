"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth.store";
import { UserRoles } from "@/types/user.type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DASHBOARD_TABS = [
  { label: "Instâncias", href: "/dashboard" },
  { label: "Pré-cadastros", href: "/dashboard/pre-registered" },
  { label: "Usuários", href: "/dashboard/users" },
];

const DashboardTabs = () => {
  const pathname = usePathname();

  const { user } = useAuthStore();

  return (
    <Tabs value={pathname} className="w-full">
      <TabsList className="flex gap-2 border-b mb-4">
        {DASHBOARD_TABS.map((tab) => {
          if (
            user?.role === UserRoles.ADMIN ||
            user?.role === UserRoles.SUPER
          ) {
            return (
              <Link key={tab.href} href={tab.href}>
                <TabsTrigger value={tab.href}>{tab.label}</TabsTrigger>
              </Link>
            );
          } else if (tab.label === "Instâncias") {
            return (
              <Link key={tab.href} href={tab.href}>
                <TabsTrigger value={tab.href}>{tab.label}</TabsTrigger>
              </Link>
            );
          }
        })}
      </TabsList>
    </Tabs>
  );
};

export default DashboardTabs;
