import type { Metadata } from "next";
import Link from "next/link";
import { readingTypes } from "@/lib/readingTypes";

export const metadata: Metadata = {
  title: "全読書型一覧｜物語コンパス",
  description:
    "物語コンパスの読書タイプ一覧ページです。感情没入型、世界観探索型、スリル追跡型、内省思索型、癒やし余韻型、テンポ重視型など、それぞれの読書傾向を解説します。",
};

export default function TypesPage() {
  return (
    <main
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "32px 16px 56px",
        color: "#3f2f24",
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
            fontSize: "clamp(28px, 5vw, 42px)",
            lineHeight: 1.2,
            marginBottom: "12px",
          }}
        >
          全読書型一覧
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.8,
            color: "#6b4f3f",
          }}
        >
          物語コンパスでは、あなたの回答から読書傾向を分析し、
          相性のよい小説をおすすめします。ここでは、それぞれの読書型の特徴を詳しく紹介します。
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {readingTypes.map((type) => (
          <Link
            key={type.id}
            href={`/types/${type.id}`}
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              background: "#ffffff",
              border: "1px solid #f3d5bd",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 8px 20px rgba(120, 72, 32, 0.08)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#ea580c",
                marginBottom: "8px",
              }}
            >
              {type.shortName}
            </p>

            <h2
              style={{
                fontSize: "22px",
                marginBottom: "10px",
              }}
            >
              {type.name}
            </h2>

            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                color: "#6b4f3f",
              }}
            >
              {type.catchcopy}
            </p>

            <p
              style={{
                marginTop: "14px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#f97316",
              }}
            >
              詳しく見る →
            </p>
          </Link>
        ))}
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
    </main>
  );
}