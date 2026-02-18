
import type { Metadata } from "next";
import { Orbitron, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sentinel Cloud EDR",
  description: "AI-Driven Endpoint Detection & Response SOC Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${syne.variable} ${mono.variable} antialiased bg-background text-foreground overflow-hidden`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
