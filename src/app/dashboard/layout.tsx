import DashboardTabs from "@/components/dashboard-tabs/dashboard-tabs";
import AuthProvider from "@/providers/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="mx-auto bg-white rounded-lg shadow p-4">
          <DashboardTabs />

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
}
