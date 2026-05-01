import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://novel-compass.com"),
  title: "小説診断｜あなたに合う小説をAIが推薦【物語コンパス】",
  description:
    "簡単な質問に答えるだけで、あなたにぴったりの小説をAIが診断。読書タイプからおすすめの本を紹介します。",
  openGraph: {
    title: "物語コンパス｜あなたに合う小説をAIが診断",
    description:
      "読書タイプを診断して、あなたに合う小説をAIが推薦します。",
    url: "https://novel-compass.com",
    siteName: "物語コンパス",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "物語コンパス｜あなたに合う小説をAIが診断",
    description:
      "読書タイプを診断して、あなたに合う小説をAIが推薦します。",
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