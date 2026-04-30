import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://novel-diagnosis.vercel.app/"),
  title: {
    default: "物語コンパス",
    template: "%s | 物語コンパス",
  },
  description:
    "AIがあなたの読書傾向を診断して、今のあなたに合う小説をおすすめするサイトです。",
  applicationName: "物語コンパス",
  openGraph: {
    title: "物語コンパス",
    description:
      "AIがあなたの読書傾向を診断して、今のあなたに合う小説をおすすめするサイトです。",
    siteName: "物語コンパス",
    type: "website",
  },
  alternates: {
    canonical: "https://novel-diagnosis.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}