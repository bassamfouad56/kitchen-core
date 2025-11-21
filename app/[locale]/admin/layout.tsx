import AdminIntlProvider from "./components/AdminIntlProvider";
import AdminLayoutClient from "./components/AdminLayoutClient";
import { ToastProvider } from "./components/Toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminIntlProvider>
      <ToastProvider>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </ToastProvider>
    </AdminIntlProvider>
  );
}
