import type { Metadata, Viewport } from "next";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8B1E3F",
};

export const metadata: Metadata = {

  title: "Charukala",

  description:
    "Luxury Fashion Platform"

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body className="font-body">

        <Navbar />

        {children}

        <Footer />

      </body>

    </html>

  );

}