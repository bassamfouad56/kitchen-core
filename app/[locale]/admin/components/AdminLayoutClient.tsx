"use client";

import { ReactNode } from "react";
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

  return (
    <>
      <div className="flex min-h-screen bg-black">
        <AdminSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <GlobalSearch isOpen={isOpen} onClose={close} />
    </>
  );
}
