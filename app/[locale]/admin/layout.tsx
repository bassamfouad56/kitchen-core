import AdminIntlProvider from "./components/AdminIntlProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminIntlProvider>{children}</AdminIntlProvider>;
}
