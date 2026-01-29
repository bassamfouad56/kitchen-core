import AdminIntlProvider from "./components/AdminIntlProvider";
import AdminLayoutClient from "./components/AdminLayoutClient";
import { ToastProvider } from "./components/Toast";
import { ConfirmProvider } from "./components/ConfirmModal";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const { locale } = await params;

  return (
    <AdminIntlProvider locale={locale}>
      <ToastProvider>
        <ConfirmProvider>
          <AdminLayoutClient>{children}</AdminLayoutClient>
        </ConfirmProvider>
      </ToastProvider>
    </AdminIntlProvider>
  );
}
