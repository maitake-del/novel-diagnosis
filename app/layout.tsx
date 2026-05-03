import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://novel-compass.com"),

  title: "小説診断｜あなたに合う小説をAIが推薦【物語コンパス】",
  description:
    "簡単な質問に答えるだけで、今の気分にぴったりの小説をAIが診断。読書タイプからおすすめの本を紹介します。",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    title: "物語コンパス｜今の気分に合う小説をAIが診断",
    description:
      "読書タイプを診断して、今の気分に合う小説をAIが推薦します。",
    url: "https://novel-compass.com",
    siteName: "物語コンパス",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "物語コンパス｜今の気分に合う小説をAIが診断",
    description:
      "読書タイプを診断して、今の気分に合う小説をAIが推薦します。",
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