import { DashboardSiderBar } from "@/components/dashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Administrativo",
  description: "Panel administrativo de la aplicación",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSiderBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
