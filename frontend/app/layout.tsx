import type { Metadata } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SETU — From Problems to Impact",
  description:
    "SETU connects real societal challenges with university-led R&D, CSR enablement, and verified real-world outcomes.",
  icons: {
    icon: "/assets/setu-mark.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#f5f6f1] text-[#101312] antialiased selection:bg-[#9de7cf] selection:text-[#090b0b]">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
