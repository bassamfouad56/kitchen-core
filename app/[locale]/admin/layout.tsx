import AdminIntlProvider from "./components/AdminIntlProvider";
import AdminSidebar from "./components/AdminSidebar";
import { ToastProvider } from "./components/Toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminIntlProvider>
      <ToastProvider>
        <div className="flex min-h-screen bg-black">
          <AdminSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </ToastProvider>
    </AdminIntlProvider>
  );
}
