import AuthProvider from "@/providers/AuthProvider";
import ConfigsTabs from "./tabs/ConfigTabs";

export default function ConfigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="mx-auto bg-white rounded-lg shadow p-4">
          <h1 className="text-3xl font-bold mb-6 text-green-600">
            Configurações da Conta
          </h1>
          <ConfigsTabs />

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
}
