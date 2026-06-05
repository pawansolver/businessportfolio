import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/ui/footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MouseGlow from "@/components/providers/MouseGlow";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Pawan.dev — Full Stack Developer",
    template: "%s | Pawan.dev",
  },
  description:
    "Independent Full Stack Developer helping businesses build modern websites, apps, and digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <SmoothScroll>
          <MouseGlow />
          <div className="relative z-10">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
