import { DashboardSiderBar } from "@/components/dashboard";
import { SidebarProvider } from "@/components/ui";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Panel Administrativo",
  description: "Panel administrativo de la aplicación",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSiderBar />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
