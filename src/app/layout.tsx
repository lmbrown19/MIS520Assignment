import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PortalClientRoot } from "@/components/portal-client-root";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fairness & Transparency Portal",
  description:
    "Algorithmic transparency for players and developers — bands and qualitative factors only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-100 text-slate-900">
        <PortalClientRoot>{children}</PortalClientRoot>
      </body>
    </html>
  );
}
