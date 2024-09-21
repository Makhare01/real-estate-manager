import type { Metadata } from "next";
import localFont from "next/font/local";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

const FiraGO = localFont({
  src: "../assets/fonts/FiraGO-Regular.otf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const HelveticaNeue = localFont({
  src: "../assets/fonts/HelveticaNeueMedium.otf",
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

export const fetchCache = "force-no-store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FiraGO.variable} ${HelveticaNeue.variable} antialiased`}
      >
        <div className="w-full sticky top-0 bg-white z-10">
          <div className="container py-8 px-5 flex">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          <hr className="w-full" />
        </div>
        <Toaster position="bottom-center" />
        <div className="container py-10 px-5">{children}</div>
      </body>
    </html>
  );
}
