import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "../providers";
import AdminIntlProvider from "./components/AdminIntlProvider";
import "../globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <AdminIntlProvider>{children}</AdminIntlProvider>
        </Providers>
      </body>
    </html>
  );
}
