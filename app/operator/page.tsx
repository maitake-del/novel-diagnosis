import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営者情報｜物語コンパス",
  description: "物語コンパスの運営者情報ページです。",
};

export default function OperatorPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fef3c7, #ffedd5)",
        color: "#111827",
        padding: "40px 20px",
      }}
    >
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            marginBottom: "24px",
          }}
        >
          運営者情報
        </h1>

        <div
          style={{
            border: "1px solid #fed7aa",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              borderBottom: "1px solid #fed7aa",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff7ed",
                padding: "16px",
                fontWeight: 700,
              }}
            >
              サイト名
            </div>
            <div style={{ padding: "16px" }}>物語コンパス</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              borderBottom: "1px solid #fed7aa",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff7ed",
                padding: "16px",
                fontWeight: 700,
              }}
            >
              運営者
            </div>
            <div style={{ padding: "16px" }}>物語コンパス運営者</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              borderBottom: "1px solid #fed7aa",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff7ed",
                padding: "16px",
                fontWeight: 700,
              }}
            >
              サイトURL
            </div>
            <div style={{ padding: "16px", wordBreak: "break-all" }}>
              https://novel-compass.com/
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff7ed",
                padding: "16px",
                fontWeight: 700,
              }}
            >
              お問い合わせ
            </div>
            <div style={{ padding: "16px" }}>
              <a
                href="/contact"
                style={{
                  color: "#f97316",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                お問い合わせページ
              </a>
              よりお願いいたします。
            </div>
          </div>
        </div>

        <p
          style={{
            lineHeight: 1.8,
            color: "#374151",
            marginBottom: "24px",
          }}
        >
          物語コンパスは、質問への回答をもとに、今の気分や読書傾向に合った小説を紹介する診断サービスです。
          利用者が新しい物語と出会うきっかけを作ることを目的として運営しています。
        </p>

        <a
          href="/"
          style={{
            color: "#f97316",
            fontWeight: 700,
            textDecoration: "underline",
          }}
        >
          トップページへ戻る
        </a>
      </section>
    </main>
  );
}