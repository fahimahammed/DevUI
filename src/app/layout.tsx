// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackToTopButton from '@/components/ui/BackToTopButton';
import "./globals.css";
import ThemeColorPicker from "@/components/ui/ThemeColorPicker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevUI",
  description: "a modern, open-source component library showcase built with shadcn/ui components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeColorPicker />
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}
