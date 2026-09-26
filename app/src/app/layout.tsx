import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Splash } from "@/components/Splash";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrivVault - Midnight",
  description: "Prove membership without revealing your private credential. Built on Midnight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-surface text-primary">
        <Splash />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
