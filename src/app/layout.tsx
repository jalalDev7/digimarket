import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Archivo } from "next/font/google";
import { Libre_Franklin } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});

const libre = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DIGIMarket | Digital products for the best prices",
  description:
    "The 1st Digital products store, the best price and the best quality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo} ${libre} antialiased`}>{children}</body>
    </html>
  );
}
