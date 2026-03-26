import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });

export const metadata: Metadata = {
  title: "Sterling Vane | The Sovereign Collection",
  description: "A premium real estate fintech platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-brand-accent selection:text-white">
      <body className={`${inter.variable} font-sans antialiased text-slate-800 bg-brand-light min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 flex flex-col pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
