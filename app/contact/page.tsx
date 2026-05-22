import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お問い合わせ｜物語コンパス",
  description:
    "物語コンパスに関するお問い合わせページです。ご質問やご連絡はこちらからお願いいたします。",
};

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f4",
        color: "#3f2f24",
        padding: "40px 16px 64px",
      }}
    >
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <section
          style={{
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: "24px",
            padding: "28px 20px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#c2410c",
              marginBottom: "8px",
            }}
          >
            物語コンパス
          </p>

          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            お問い合わせ
          </h1>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#6b4f3f",
            }}
          >
            物語コンパスに関するお問い合わせは、以下のメールアドレスまでお願いいたします。
          </p>
        </section>

        <section
          style={{
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: "24px",
            padding: "24px 20px",
            marginBottom: "24px",
            boxShadow: "0 8px 20px rgba(120, 72, 32, 0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              marginBottom: "12px",
              color: "#3f2f24",
            }}
          >
            お問い合わせ先
          </h2>

          <a
            href="mailto:fidvb47611@yahoo.co.jp"
            style={{
              color: "#ea580c",
              fontSize: "18px",
              fontWeight: 700,
              textDecoration: "underline",
              wordBreak: "break-all",
            }}
          >
            fidvb47611@yahoo.co.jp
          </a>
        </section>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link
            href="/"
            style={{
              color: "#f97316",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}