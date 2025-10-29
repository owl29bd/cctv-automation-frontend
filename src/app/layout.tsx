import "./globals.css";

import ContextProvider from "@/providers/ContextProvider";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";

const font = GeistMono;

export const metadata: Metadata = {
  title: "CCTV Automation",
  description: "CCTV Automation System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
