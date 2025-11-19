"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import FloatingSocialWrapper from "./FloatingSocialWrapper";

export default function PublicLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current route is admin
  const isAdminRoute = pathname?.includes("/admin");

  // For admin routes, render only children without public layout
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For public routes, render with Navigation, Footer, etc.
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <ContactForm />
      <FloatingSocialWrapper />
    </>
  );
}
