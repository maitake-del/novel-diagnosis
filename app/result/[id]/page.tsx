"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

type ScoreItem = {
  key: string;
  label: string;
  value: number;
};

const scoreLabels: Record<string, string> = {
  emotion: "感情移入",
  world: "世界観",
  thrill: "緊張感",
  reflection: "思索",
  healing: "癒やし",
  tempo: "テンポ",
};

export default function ResultPage() {
  const searchParams = useSearchParams();

  const diagnosisType = searchParams.get("type") ?? "物語探求型";
  const description =
    searchParams.get("description") ?? "あなたに合う物語の傾向を診断しました。";

  const scores = useMemo<ScoreItem[]>(() => {
    return Object.entries(scoreLabels).map(([key, label]) => ({
      key,
      label,
      value: Number(searchParams.get(key) ?? 0),
    }));
  }, [searchParams]);

  const topScores = [...scores].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f4",
        color: "#111827",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            marginBottom: "32px",
            borderRadius: "28px",
            background: "linear-gradient(to right, #fff7ed, #ffedd5)",
            padding: "32px",
            border: "1px solid #fdba74",
          }}
        >
          <p
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: 700,
              color: "#c2410c",
            }}
          >
            診断結果
          </p>

          <h1
            style={{
              marginBottom: "12px",
              fontSize: "42px",
              lineHeight: 1.2,
              fontWeight: 800,
            }}
          >
            あなたは
            <br />
            「{diagnosisType}」タイプです
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            {description}
          </p>
        </div>

        <section
          style={{
            marginBottom: "32px",
            borderRadius: "24px",
            backgroundColor: "#ffffff",
            border: "1px solid #d1d5db",
            padding: "24px",
          }}
        >
          <h2
            style={{
              marginBottom: "16px",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            あなたの強い傾向
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "16px",
            }}
          >
            {topScores.map((item) => (
              <div
                key={item.key}
                style={{
                  borderRadius: "18px",
                  backgroundColor: "#fff7ed",
                  padding: "18px",
                  border: "1px solid #fdba74",
                }}
              >
                <div
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#9a3412",
                    fontWeight: 700,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginBottom: "32px",
            borderRadius: "24px",
            backgroundColor: "#ffffff",
            border: "1px solid #d1d5db",
            padding: "24px",
          }}
        >
          <h2
            style={{
              marginBottom: "16px",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            6つの診断スコア
          </h2>

          <div
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            {scores.map((item) => (
              <div key={item.key}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    fontSize: "15px",
                    color: "#374151",
                  }}
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "9999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(item.value * 10, 100)}%`,
                      height: "12px",
                      backgroundColor: "#ea580c",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginBottom: "32px",
            borderRadius: "24px",
            backgroundColor: "#ffffff",
            border: "1px solid #d1d5db",
            padding: "24px",
          }}
        >
          <h2
            style={{
              marginBottom: "12px",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            フェーズ1完了
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#374151",
            }}
          >
            ここまでで、質問への回答から診断スコアを計算し、
            診断タイプを決めて、結果ページへ表示する流れが完成しました。
            次のフェーズでは、この診断結果を使って本のデータベースから
            おすすめ小説を選ぶ仕組みを作ります。
          </p>
        </section>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/diagnosis"
            style={{
              borderRadius: "16px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              padding: "16px 24px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            もう一度診断する
          </a>

          <a
            href="/"
            style={{
              border: "1px solid #9ca3af",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              color: "#111827",
              padding: "16px 24px",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            トップへ戻る
          </a>
        </div>
      </div>
    </main>
  );
}