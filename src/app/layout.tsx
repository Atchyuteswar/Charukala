import type { Metadata, Viewport } from "next";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";

import AIStylist from "@/components/ai/AIStylist";
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
    "Luxury AI Fashion Platform"

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body>

        <Navbar />

        {children}

        <AIStylist />

        <Footer />

      </body>

    </html>

  );

}