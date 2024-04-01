import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/toaster";
import ComingSoon from "./coming-soon/page";

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link in bio | Linkwajo",
  description: "The simple link in bio for product-focused users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className + ' overflow-x-hidden'}>
        <StoreProvider>
          {/* {children} */}
          <ComingSoon />
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
