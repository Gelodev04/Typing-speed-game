import type { Metadata } from "next";
import "./globals.css";
import Head from 'next/head';

export const metadata: Metadata = {
  title: "Type Faster",
  description: "Just Type Faster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
