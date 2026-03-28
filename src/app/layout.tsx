import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Providers } from "@/components/layout/Providers";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  title: "Sterling Vane | The Sovereign Collection",
  description: "Luxury Real Estate Investment Platform. Precision. Legacy. Exclusivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-[#C9A84C]/30 selection:text-[#0A0A0A]">
      <body className={`${dmSans.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased text-[#0A0A0A] bg-[#F5F0E8] min-h-screen flex flex-col`}>
        <Providers>
          <LayoutShell>
            {children}
          </LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
