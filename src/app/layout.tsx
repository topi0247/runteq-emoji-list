import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "らんすた",
  description: "RUNTEQのマタモのカスタムスタンプ集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
