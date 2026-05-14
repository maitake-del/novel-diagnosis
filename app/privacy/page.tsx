import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜物語コンパス",
  description: "物語コンパスのプライバシーポリシーです。",
};

export default function PrivacyPage() {
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
          maxWidth: "900px",
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
          プライバシーポリシー
        </h1>

        <p style={{ lineHeight: 1.8, marginBottom: "24px" }}>
          物語コンパス（以下、「当サイト」といいます。）では、利用者の個人情報の保護に配慮し、
          以下のとおりプライバシーポリシーを定めます。
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: 700, marginTop: "28px", marginBottom: "12px" }}>
          個人情報の利用目的
        </h2>
        <p style={{ lineHeight: 1.8 }}>
          当サイトでは、お問い合わせの際にメールアドレス等の情報を取得する場合があります。
          取得した情報は、お問い合わせへの回答や必要な連絡のために利用し、それ以外の目的では利用しません。
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: 700, marginTop: "28px", marginBottom: "12px" }}>
          アクセス解析ツールについて
        </h2>
        <p style={{ lineHeight: 1.8 }}>
          当サイトでは、サイトの利用状況を把握し改善するために、アクセス解析ツールを利用する場合があります。
          これらのツールはCookieを使用して匿名の利用情報を収集することがあります。
          Cookieを無効にすることで、情報の収集を拒否することができます。
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: 700, marginTop: "28px", marginBottom: "12px" }}>
          広告について
        </h2>
        <p style={{ lineHeight: 1.8 }}>
          当サイトでは、第三者配信の広告サービスを利用する場合があります。
          広告配信事業者は、利用者の興味に応じた広告を表示するためにCookieを使用することがあります。
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: 700, marginTop: "28px", marginBottom: "12px" }}>
          アフィリエイトプログラムについて
        </h2>
        <p style={{ lineHeight: 1.8 }}>
          当サイトは、アフィリエイトプログラムを利用しています。
          当サイト内のリンクから商品やサービスを購入された場合、当サイトが報酬を受け取ることがあります。
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: 700, marginTop: "28px", marginBottom: "12px" }}>
          免責事項
        </h2>
        <p style={{ lineHeight: 1.8 }}>
          当サイトに掲載する情報については、できる限り正確な内容を提供するよう努めますが、
          情報の正確性や安全性を保証するものではありません。
          当サイトの利用によって生じた損害等について、当サイトは責任を負いかねます。
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: 700, marginTop: "28px", marginBottom: "12px" }}>
          著作権について
        </h2>
        <p style={{ lineHeight: 1.8 }}>
          当サイトに掲載している文章・画像・デザイン等の無断転載を禁止します。
          引用を行う場合は、引用元を明示し、適切な範囲で行ってください。
        </p>

        <h2 style={{ fontSize: "22px", fontWeight: 700, marginTop: "28px", marginBottom: "12px" }}>
          お問い合わせ
        </h2>
        <p style={{ lineHeight: 1.8, marginBottom: "24px" }}>
          本ポリシーに関するお問い合わせは、
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
        </p>

        <p style={{ lineHeight: 1.8, color: "#6b7280", fontSize: "14px" }}>
          制定日：2026年5月
        </p>

        <div style={{ marginTop: "32px" }}>
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
        </div>
      </section>
    </main>
  );
}