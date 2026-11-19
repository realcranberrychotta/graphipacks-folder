import type { Metadata } from "next";
import { Bodoni_Moda, Manrope, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ShaderBackground from "@/components/ShaderBackground";
import "lenis/dist/lenis.css";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://graphipacks.com"),
  title: "Graphipacks Private Limited | Flexible Packaging Solution Providers",
  description:
    "Graphipacks Private Limited specializes in high-quality flexible packaging solutions: Agriculture Mulch Film, Grow Bags, Coir Pith Bags, Laminated Rolls & Pouches, and Poly Bags.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoni.variable} ${manrope.variable} ${geistMono.variable} h-full dark`}
    >
      <body
        suppressHydrationWarning
        className={`${bodoni.variable} ${manrope.variable} ${geistMono.variable} flex min-h-full flex-col bg-transparent text-[#F8F4EC] font-sans antialiased selection:bg-[#B08D57] selection:text-[#091B2C]`}
      >
        <SmoothScroll />
        <ShaderBackground />
        <Preloader />
        <ScrollProgressBar />
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </body>
    </html>
  );
}
