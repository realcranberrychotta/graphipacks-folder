import type { Metadata } from "next";
import { Playfair_Display, Manrope, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import PageTransition from "@/components/PageTransition";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import "lenis/dist/lenis.css";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://graphipacks-folder.vercel.app"),
  title: "Graphipacks Private Limited | Flexible Packaging Solution Providers",
  description:
    "Graphipacks Private Limited specializes in high-quality flexible packaging solutions: Agriculture Mulch Film, Grow Bags, Coir Pith Bags, Laminated Rolls & Pouches, and Poly Bags.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
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
      className={`${playfair.variable} ${manrope.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.location.pathname === '/' && localStorage.getItem('graphipacks-intro-seen') !== 'true') {
                  document.documentElement.classList.add('show-intro');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${manrope.variable} ${geistMono.variable} flex min-h-full flex-col bg-background text-ink font-sans antialiased selection:bg-heritage selection:text-background`}
      >
        <SmoothScroll />
        <Preloader />
        <ScrollProgressBar />
        <Header />
        <MainContent>
          <PageTransition>{children}</PageTransition>
        </MainContent>
        <Footer />
      </body>
    </html>
  );
}
