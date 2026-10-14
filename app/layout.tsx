import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getSettings } from "@/lib/queries";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { siteTitle, siteDescription } = await getSettings();

  return {
    title: siteTitle,
    description: siteDescription,
    icons: {
      icon: "/portafolio.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}