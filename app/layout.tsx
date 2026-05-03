import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://novel-compass.com";
const siteName = "物語コンパス";
const ogImageUrl = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "物語コンパス｜今の気分に合う小説をAIが診断",
    template: "%s｜物語コンパス",
  },

  description:
    "簡単な質問に答えるだけで、今の気分にぴったりの小説をAIが診断。読書タイプからおすすめの本を紹介します。",

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        url: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "物語コンパス｜今の気分に合う小説をAIが診断",
    description:
      "読書タイプを診断して、今の気分に合う小説をAIが推薦します。",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "物語コンパス｜今の気分に合う小説をAIが診断",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "物語コンパス｜今の気分に合う小説をAIが診断",
    description:
      "読書タイプを診断して、今の気分に合う小説をAIが推薦します。",
    images: [ogImageUrl],
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