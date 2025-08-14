import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header/Header";
import ReactQueryProvider from "./_components/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import LocalCartProvider from "./_context/LocalCartProvider";
import UserProvider from "./_components/UserProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Style Hub",
  description: "E-commerce platform for fashion and lifestyle products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} antialiased text-black-txt bg-soft-bg min-h-screen`}
      >
        <ReactQueryProvider>
          <LocalCartProvider>
            <UserProvider>
              <Header />
              <main>{children}</main>
              <Toaster />
            </UserProvider>
          </LocalCartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
