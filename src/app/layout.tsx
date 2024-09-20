import type { Metadata } from "next";
import localFont from "next/font/local";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

import "../styles/globals.css";

const FiraGO = localFont({
  src: "../assets/fonts/FiraGO-Regular.otf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "Real Estate Manager",
    default: "Real Estate Manager",
  },
  description: "Real estate manager dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FiraGO.variable} antialiased`}>
        <div className="w-full sticky top-0 bg-white z-10">
          <div className="container py-8 px-5 flex">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          <hr className="w-full" />
        </div>

        <div className="container py-10 px-5">{children}</div>
      </body>
    </html>
  );
}
