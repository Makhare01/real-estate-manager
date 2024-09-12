import type { Metadata } from "next";
import localFont from "next/font/local";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

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
      <body
        className={`${FiraGO.variable} antialiased flex flex-col items-center`}
      >
        <div className="container py-8 px-5">
          <Image src={logo} alt="logo" />
        </div>

        <hr className="w-full" />

        <div className="container pt-10 px-5">{children}</div>
      </body>
    </html>
  );
}
