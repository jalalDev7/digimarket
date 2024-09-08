import type { Metadata } from "next";
import "./globals.css";
import { Archivo } from "next/font/google";
import { Providers } from "@/components/component/Providers";

const archivo = Archivo({
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
      <body className={`${archivo}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
