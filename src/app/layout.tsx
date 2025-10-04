// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackToTopButton from "@/components/ui/BackToTopButton";
import "./globals.css";
import ThemeColorPicker from "@/components/ui/ThemeColorPicker";
import { ThemeProvider } from "next-themes"; // ⬅️ import
import { Toaster } from "@/components/ui/sonner";

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
  description:
    "a modern, open-source component library showcase built with shadcn/ui components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Wrap everything in ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeColorPicker />
          {children}
          <Toaster position="top-center" richColors />
          <BackToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
