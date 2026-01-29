"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import AdminSidebar from "./AdminSidebar";
import GlobalSearch from "@/app/components/GlobalSearch";
import { useGlobalSearch } from "@/app/hooks/useGlobalSearch";

interface AdminLayoutClientProps {
  children: ReactNode;
}

export default function AdminLayoutClient({
  children,
}: AdminLayoutClientProps) {
  const { isOpen, close } = useGlobalSearch();
  const pathname = usePathname();
  const { status } = useSession();
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Hide sidebar on login page or when not authenticated
  const isLoginPage = pathname?.includes("/admin/login");
  const isAuthenticated = status === "authenticated";
  const showSidebar = isAuthenticated && !isLoginPage;

  return (
    <>
      <div className={`flex min-h-screen bg-black ${isArabic ? "flex-row-reverse" : ""}`}>
        {showSidebar && <AdminSidebar />}
        <main className={`flex-1 min-w-0 ${!showSidebar ? "w-full" : ""}`}>
          {children}
        </main>
      </div>
      {showSidebar && <GlobalSearch isOpen={isOpen} onClose={close} />}
    </>
  );
}
