import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Impersonator",
  description: "Impersonate anyone you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
