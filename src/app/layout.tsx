import type { Metadata } from "next";
import "./globals.css";
import { Archivo } from "next/font/google";
import { Providers } from "@/components/component/Providers";
import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DIGIMarket | Digital products for the best prices",
  description:
    "The 1st Digital products store, the best price and the best quality",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <html lang="en">
      <body className={`${archivo}  antialiased`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
