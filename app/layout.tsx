import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./api/auth/[...nextauth]/AuthProvider";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/bug.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
      <body className={`${inter.className}`}>
        <AuthProvider>
          <NavBar />
          <main className="container mx-auto p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
