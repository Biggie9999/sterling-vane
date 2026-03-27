import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Providers } from "@/components/layout/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Sterling Vane | Fractional Real Estate Investing",
  description: "A premium real estate fintech platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-[#006AFF] selection:text-white">
      <body className={`${inter.variable} ${space.variable} font-sans antialiased text-[#1a1a1a] bg-white min-h-screen flex flex-col`}>
        <Providers>
          <LayoutShell>
            {children}
          </LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
