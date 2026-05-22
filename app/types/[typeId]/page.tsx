import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReadingType, readingTypes } from "@/lib/readingTypes";

type Props = {
  params: Promise<{
    typeId: string;
  }>;
};

export function generateStaticParams() {
  return readingTypes.map((type) => ({
    typeId: type.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { typeId } = await params;
  const type = getReadingType(typeId);

  if (!type) {
    return {
      title: "読書型が見つかりません｜物語コンパス",
    };
  }

  return {
    title: `${type.name}とは？特徴とおすすめ小説の傾向｜物語コンパス`,
    description: `${type.name}は、${type.catchcopy} 特徴や相性のよい小説の傾向を解説します。`,
    openGraph: {
      title: `${type.name}とは？｜物語コンパス`,
      description: type.catchcopy,
      url: `/types/${type.id}`,
      siteName: "物語コンパス",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${type.name}とは？｜物語コンパス`,
      description: type.catchcopy,
    },
  };
}

export default async function TypeDetailPage({ params }: Props) {
  const { typeId } = await params;
  const type = getReadingType(typeId);

  if (!type) {
    notFound();
  }

  return (
    <main
      style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "32px 16px 56px",
        color: "#3f2f24",
        backgroundColor: "#f5f5f4",
      }}
    >
      <article>
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
            読書タイプ解説
          </p>

          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            {type.name}とは？
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#6b4f3f",
              fontWeight: 700,
            }}
          >
            {type.catchcopy}
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>{type.name}の特徴</h2>
          <p style={paragraphStyle}>{type.description}</p>

          <ul style={listStyle}>
            {type.features.map((feature) => (
              <li key={feature} style={listItemStyle}>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>こんな人におすすめ</h2>

          <ul style={listStyle}>
            {type.recommendedFor.map((item) => (
              <li key={item} style={listItemStyle}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>相性のよいキーワード</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {type.keywords.map((keyword) => (
              <span
                key={keyword}
                style={{
                  background: "#ffedd5",
                  color: "#9a3412",
                  borderRadius: "999px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                #{keyword}
              </span>
            ))}
          </div>
        </section>

        <section
          style={{
            ...sectionStyle,
            textAlign: "center",
            background: "#fff7ed",
          }}
        >
          <h2 style={headingStyle}>あなたの読書タイプを診断する</h2>

          <p style={paragraphStyle}>
            簡単な質問に答えるだけで、あなたに合う小説と読書タイプを診断できます。
          </p>

          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "12px",
              background: "#f97316",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "999px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            診断をはじめる
          </Link>
        </section>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginTop: "28px",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/types"
            style={{
              color: "#f97316",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            全読書型一覧へ
          </Link>

          <Link
            href="/"
            style={{
              color: "#f97316",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            トップページへ
          </Link>
        </div>
      </article>
    </main>
  );
}

const sectionStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f3d5bd",
  borderRadius: "20px",
  padding: "22px 18px",
  marginBottom: "18px",
  boxShadow: "0 8px 20px rgba(120, 72, 32, 0.06)",
};

const headingStyle: React.CSSProperties = {
  fontSize: "24px",
  marginBottom: "12px",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.9,
  color: "#6b4f3f",
};

const listStyle: React.CSSProperties = {
  paddingLeft: "20px",
  marginTop: "12px",
};

const listItemStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.9,
  color: "#6b4f3f",
  marginBottom: "6px",
};