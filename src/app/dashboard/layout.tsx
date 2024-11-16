import { auth } from "@/auth";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Trustimonial dashboard",
  description: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <>
      <AppSidebar>
        <main>{children}</main>
      </AppSidebar>
    </>
  );
}
