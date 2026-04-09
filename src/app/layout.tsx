import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientRoot } from "@/components/client-root";
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
  title: "Algorithmic Fairness & Transparency Portal",
  description:
    "Transparency summaries for matchmaking, moderation, and storefront placement.",
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
      <body className="min-h-full flex flex-col font-sans text-slate-900">
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
