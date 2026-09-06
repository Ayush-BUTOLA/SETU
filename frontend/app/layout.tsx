import type { Metadata } from "next";
import { Manrope, DM_Mono, Lora } from "next/font/google";
import { Toaster } from "sonner";
import { AuthModalProvider } from "@/context/AuthModalContext";
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

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SETU — Connecting Communities with Solutions",
  description:
    "SETU connects people who experience real local problems with the universities, institutions, and partners who can help create lasting solutions.",
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
      className={`${manrope.variable} ${dmMono.variable} ${lora.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#f5f6f1] text-[#101312] antialiased selection:bg-[#9de7cf] selection:text-[#090b0b]">
        <AuthModalProvider>
          {children}
        </AuthModalProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
