import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEAP Transformation Navigator",
  description: "Explore the conditions that can enable equitable and sustainable school transformation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
