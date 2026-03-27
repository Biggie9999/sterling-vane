import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Providers } from "@/components/layout/Providers";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

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
    <html lang="en" className="scroll-smooth selection:bg-[#C9A84C] selection:text-white">
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased text-[#1a1a1a] bg-[#F5F0E8] min-h-screen flex flex-col`}>
        <Providers>
          <LayoutShell>
            {children}
          </LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
