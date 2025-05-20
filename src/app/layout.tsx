import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ReactQueryProvider from "@/providers/react-query-provider";
import ToasterProvider from "@/providers/toaster-provider";
import SidebarMenu from "@/components/sidebar-menu/sidebar-menu";
import { Suspense } from "react";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JCWPP",
  description: "JCWPP a melhor api do wpp e mais rapida do mercado!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <ReactQueryProvider>
          <ToasterProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex">
                <SidebarMenu />
                <div className="flex-1 min-h-screen">
                  <Suspense fallback={<div>Carregando...</div>}>
                    {children}
                  </Suspense>
                </div>
              </main>
            </AuthProvider>
          </ToasterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
