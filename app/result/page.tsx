"use client";

import { useEffect, useState } from "react";

function ShareIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 5l4 4m0 0l-4 4m4-4H9a4 4 0 00-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="9"
        y="9"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="5"
        y="5"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.9 2H21l-6.9 7.9L22.2 22h-6.4l-5-6.6L4.9 22H2.8l7.4-8.4L2 2h6.5l4.5 6L18.9 2Zm-2.2 18h1.8L7.4 3.9H5.5L16.7 20Z" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3C6.5 3 2 6.7 2 11.2c0 4 3.5 7.4 8.2 8L9 22l3.1-2.5H12c5.5 0 10-3.7 10-8.3C22 6.7 17.5 3 12 3Z"
        fill="currentColor"
      />
      <text
        x="12"
        y="13.3"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="Arial, sans-serif"
      >
        LINE
      </text>
    </svg>
  );
}

type RecommendedBook = {
  id: number;
  title: string;
  author: string;
  description: string;
  tags: string[];
  matchScore: number;
  matchedTraits: string[];
  aiReason: string;
  kindle_url?: string | null;
bookwalker_url?: string | null;
honto_url?: string | null;
rakuten_kobo_url?: string | null;
};

type DiagnosisResult = {
  diagnosisType: string;
  description: string;
  aiDiagnosisSummary?: string;
  scores: Record<string, number>;
  recommendedBooks: RecommendedBook[];
};

type BonusResult = {
  freeText: string;
  freeTextAnalysis: string;
  bonusRecommendation: {
    id: number;
    title: string;
    author: string;
    description: string;
    tags: string[];
    matchScore: number;
    matchedTraits: string[];
    aiReason: string;
    kindle_url?: string | null;
bookwalker_url?: string | null;
honto_url?: string | null;
rakuten_kobo_url?: string | null;
  } | null;
};

const scoreLabelMap: Record<string, string> = {
  emotion: "感情移入",
  world: "世界観",
  thrill: "緊張感",
  reflection: "思索",
  healing: "癒やし",
  tempo: "テンポ",
};

export default function ResultPage() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [freeText, setFreeText] = useState("");
  const [bonusLoading, setBonusLoading] = useState(false);
  const [bonusResult, setBonusResult] = useState<BonusResult | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("diagnosisResult");
    if (!raw) return;

    setResult(JSON.parse(raw));
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBonusRecommend = async () => {
    if (!result) return;

    if (!freeText.trim()) {
      alert("自由記述を入力してください。");
      return;
    }

    try {
      setBonusLoading(true);

      const excludeIds = result.recommendedBooks.map((book) => book.id);

      const res = await fetch("/api/bonus-recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scores: result.scores,
          freeText,
          excludeIds,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "追加レコメンドに失敗しました。");
      }

      setBonusResult(json);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "不明なエラーが発生しました。";
      alert(message);
    } finally {
      setBonusLoading(false);
    }
  };

  if (!result) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f4",
          padding: isMobile ? "16px 8px" : "40px 24px",
          color: "#111827",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p>診断結果が見つかりません。もう一度診断してください。</p>
        </div>
      </main>
    );
  }

  const topScores = Object.entries(result.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const maxScore = Math.max(...Object.values(result.scores), 1);

  const shareText = `私は「${result.diagnosisType}」でした！ あなたも物語コンパスで小説診断を試してみてください！`;
const shareUrl =
  typeof window !== "undefined" ? window.location.origin + "/" : "";
const handleNativeShare = async () => {
  try {
    if (navigator.share) {  
      await navigator.share({
        title: "小説診断の結果",
        text: shareText,
        url: shareUrl,
      });
    } else {
      alert("このブラウザでは共有機能が使えません。");
    }
  } catch {
    // ユーザーが閉じたときなどは何もしない
  }
};

const handleCopyShareText = async () => {
  try {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    alert("シェア文をコピーしました。");
  } catch {
    alert("コピーに失敗しました。");
  }
};

const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  shareText
)}&url=${encodeURIComponent(shareUrl)}`;

const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
  shareUrl
)}`;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f4",
        color: "#111827",
        padding: isMobile ? "12px 6px" : "40px 24px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: isMobile ? "10px" : "32px",
            borderRadius: isMobile ? "20px" : "28px",
            background: "linear-gradient(to right, #fff7ed, #ffedd5)",
            padding: isMobile ? "10px" : "32px",
            border: "1px solid #fdba74",
          }}
        >
          <p
            style={{
              marginBottom: "10px",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 700,
              color: "#c2410c",
            }}
          >
            診断結果
          </p>

          <h1
            style={{
              marginBottom: "12px",
              fontSize: isMobile ? "25px" : "42px",
              lineHeight: 1.25,
              fontWeight: 800,
            }}
          >
            あなたは
            <br />
            「{result.diagnosisType}」です
          </h1>

          <p
            style={{
              fontSize: isMobile ? "12px" : "18px",
              lineHeight: isMobile ? 1.5 : 1.8,
              color: "#374151",
            }}
          >
            {result.aiDiagnosisSummary ?? result.description}
          </p>
        </div>

        <section
  style={{
    marginBottom: isMobile ? "10px" : "32px",
    borderRadius: isMobile ? "20px" : "24px",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    padding: isMobile ? "10px" : "24px",
  }}
>
  <h2
    style={{
      marginBottom: isMobile ? "10px" : "16px",
      fontSize: isMobile ? "22px" : "28px",
      fontWeight: 800,
    }}
  >
    あなたの強い傾向
  </h2>

  <div
    style={{
      display: "flex",
      gap: isMobile ? "8px" : "16px",
      alignItems: "stretch",
    }}
  >
    {topScores.map(([key, value]) => (
      <div
        key={key}
        style={{
          flex: 1,
          minWidth: 0,
          borderRadius: isMobile ? "14px" : "18px",
          backgroundColor: "#fff7ed",
          padding: isMobile ? "10px" : "18px",
          border: "1px solid #fdba74",
        }}
      >
        <div
          style={{
            marginBottom: isMobile ? "6px" : "8px",
            fontSize: isMobile ? "12px" : "14px",
            color: "#9a3412",
            fontWeight: 700,
            lineHeight: 1.3,
            wordBreak: "keep-all",
          }}
        >
          {scoreLabelMap[key] ?? key}
        </div>

        <div
          style={{
            fontSize: isMobile ? "20px" : "28px",
            fontWeight: 800,
            color: "#111827",
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
      </div>
    ))}
  </div>
</section>

        <section
          style={{
            marginBottom: isMobile ? "10px" : "32px",
            borderRadius: isMobile ? "20px" : "24px",
            backgroundColor: "#ffffff",
            border: "1px solid #d1d5db",
            padding: isMobile ? "12px" : "24px",
          }}
        >
          <h2
            style={{
              marginBottom: "7px",
              fontSize: isMobile ? "22px" : "28px",
              fontWeight: 800,
            }}
          >
            6つの診断スコア
          </h2>

          <div
            style={{
              display: "grid",
              gap: isMobile ? "12px" : "14px",
            }}
          >
            {Object.entries(result.scores).map(([key, value]) => (
              <div key={key}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    fontSize: isMobile ? "14px" : "15px",
                    color: "#374151",
                  }}
                >
                  <span>{scoreLabelMap[key] ?? key}</span>
                  <span>{value}</span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: isMobile ? "10px" : "12px",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "9999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(value / maxScore) * 100}%`,
                      height: isMobile ? "10px" : "12px",
                      backgroundColor: "#ea580c",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: isMobile ? "10px" : "32px" }}>
          <h2
            style={{
              marginBottom: "10px",
              fontSize: isMobile ? "20px" : "30px",
              fontWeight: 800,
            }}
          >
            あなたにおすすめの小説
          </h2>

          <div style={{ display: "grid", gap: isMobile ? "16px" : "20px" }}>
            {result.recommendedBooks.map((book, index) => (
              <article
                key={book.id}
                style={{
                  borderRadius: isMobile ? "20px" : "24px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db",
                  padding: isMobile ? "10px" : "24px",
                }}
              >
                <div
                  style={{
                    marginBottom: "10px",
                    display: "inline-block",
                    borderRadius: "9999px",
                    backgroundColor: "#fff7ed",
                    color: "#9a3412",
                    padding: isMobile ? "5px 10px" : "6px 12px",
                    fontSize: isMobile ? "12px" : "13px",
                    fontWeight: 700,
                  }}
                >
                  おすすめ {index + 1}位 / 相性スコア {book.matchScore}
                </div>

                <h3
                  style={{
                    marginBottom: "6px",
                    fontSize: isMobile ? "20px" : "26px",
                    fontWeight: 800,
                  }}
                >
                  {book.title}
                </h3>

                <p
                  style={{
                    marginBottom: "10px",
                    color: "#9a3412",
                    fontWeight: 700,
                    fontSize: isMobile ? "14px" : "16px",
                  }}
                >
                  {book.author}
                </p>

                <p
                  style={{
                    marginBottom: "12px",
                    fontSize: isMobile ? "12px" : "16px",
                    lineHeight: isMobile ? 1.5 : 1.8,
                    color: "#374151",
                  }}
                >
                  {book.aiReason}
                </p>
<div
  style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "7px",
  }}
>
  {book.kindle_url && (
    <a
      href={book.kindle_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderRadius: "12px",
        backgroundColor: "#111827",
        color: "#ffffff",
        padding: isMobile ? "4px 5px" : "10px 14px",
        textDecoration: "none",
        fontSize: isMobile ? "8px" : "14px",
        fontWeight: 700,
      }}
    >
      Kindleで読む
    </a>
  )}

  {book.bookwalker_url && (
    <a
      href={book.bookwalker_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderRadius: "12px",
        backgroundColor: "#f97316",
        color: "#ffffff",
        padding: isMobile ? "4px 5px" : "10px 14px",
        textDecoration: "none",
        fontSize: isMobile ? "8px" : "14px",
        fontWeight: 700,
      }}
    >
      BOOK☆WALKERで読む
    </a>
  )}

  {book.rakuten_kobo_url && (
  <a
    href={book.rakuten_kobo_url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      borderRadius: "12px",
      backgroundColor: "#bf0000",
      color: "#ffffff",
      padding: isMobile ? "4px 5px" : "10px 14px",
      textDecoration: "none",
      fontSize: isMobile ? "8px" : "14px",
      fontWeight: 700,
    }}
  >
    楽天Koboで読む
  </a>
)}

  {book.honto_url && (
    <a
      href={book.honto_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        color: "#111827",
        border: "1px solid #d1d5db",
        padding: isMobile ? "4px 5px" : "10px 14px",
        textDecoration: "none",
        fontSize: isMobile ? "8px" : "14px",
        fontWeight: 700,
      }}
    >
      hontoで読む
    </a>
  )}
</div>

              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            marginBottom: isMobile ? "10px" : "32px",
            borderRadius: isMobile ? "20px" : "24px",
            backgroundColor: "#ffffff",
            border: "1px solid #d1d5db",
            padding: isMobile ? "10px" : "24px",
          }}
        >
          <h2
            style={{
              marginBottom: "16px",
              fontSize: isMobile ? "18px" : "28px",
              fontWeight: 800,
            }}
          >
            さらにもう一冊、AIに探してもらう
          </h2>

          <p
            style={{
              marginBottom: "10px",
              fontSize: isMobile ? "12px" : "16px",
              lineHeight: isMobile ? 1.5 : 1.8,
              color: "#374151",
            }}
          >
            こういうものが読みたい、避けたい要素、今の気分などを自由に書いてください。
            AIが分析して、あなた向けにさらにもう一冊おすすめします。
          </p>

          <textarea
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            rows={isMobile ? 4 : 6}
            placeholder="例: 重すぎないけど余韻のある話が読みたい。恋愛が前面に出すぎるものは避けたい。"
            style={{
              width: "100%",
              border: "1px solid #d1d5db",
              borderRadius: "16px",
              padding: isMobile ? "12px" : "16px",
              fontSize: isMobile ? "14px" : "16px",
              color: "#111827",
              resize: "vertical",
              marginBottom: "16px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="button"
            onClick={handleBonusRecommend}
            style={{
              border: "none",
              borderRadius: "16px",
              padding: isMobile ? "14px 18px" : "16px 24px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: 700,
              cursor: "pointer",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {bonusLoading ? "AIが考え中..." : "さらに1冊おすすめしてもらう"}
          </button>
        </section>

        {bonusResult && bonusResult.bonusRecommendation && (
          <section
            style={{
              marginBottom: isMobile ? "20px" : "32px",
              borderRadius: isMobile ? "20px" : "24px",
              backgroundColor: "#ffffff",
              border: "1px solid #d1d5db",
              padding: isMobile ? "16px" : "24px",
            }}
          >
            <h2
              style={{
                marginBottom: "16px",
                fontSize: isMobile ? "22px" : "28px",
                fontWeight: 800,
              }}
            >
              自由記述から選ばれた一冊
            </h2>

            <p
              style={{
                marginBottom: "12px",
                fontSize: isMobile ? "13px" : "15px",
                lineHeight: isMobile ? 1.55 : 1.8,
                color: "#374151",
              }}
            >
              <strong>あなたの入力:</strong> {bonusResult.freeText}
            </p>

            <p
              style={{
                marginBottom: "18px",
                fontSize: isMobile ? "14px" : "15px",
                lineHeight: isMobile ? 1.7 : 1.8,
                color: "#4b5563",
              }}
            >
              {bonusResult.freeTextAnalysis}
            </p>

            <article
              style={{
                borderRadius: "20px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fdba74",
                padding: isMobile ? "16px" : "20px",
              }}
            >
              <h3
                style={{
                  marginBottom: "6px",
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: 800,
                }}
              >
                {bonusResult.bonusRecommendation.title}
              </h3>

              <p
                style={{
                  marginBottom: "12px",
                  color: "#9a3412",
                  fontWeight: 700,
                  fontSize: isMobile ? "14px" : "16px",
                }}
              >
                {bonusResult.bonusRecommendation.author}
              </p>

              <p
                style={{
                  marginBottom: "12px",
                  fontSize: isMobile ? "13px" : "16px",
                  lineHeight: isMobile ? 1.55 : 1.8,
                  color: "#374151",
                }}
              >
                {bonusResult.bonusRecommendation.aiReason}
              </p>

              <p
                style={{
                  marginBottom: "12px",
                  fontSize: isMobile ? "12px" : "15px",
                  lineHeight: isMobile ? 1.5 : 1.8,
                  color: "#6b7280",
                }}
              >
                {bonusResult.bonusRecommendation.description}
              </p>

<div
  style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "14px",
  }}
>
  {bonusResult.bonusRecommendation.kindle_url && (
    <a
      href={bonusResult.bonusRecommendation.kindle_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderRadius: "12px",
        backgroundColor: "#111827",
        color: "#ffffff",
        padding: isMobile ? "10px 12px" : "10px 14px",
        textDecoration: "none",
        fontSize: isMobile ? "13px" : "14px",
        fontWeight: 700,
      }}
    >
      Kindleで読む
    </a>
  )}

  {bonusResult.bonusRecommendation.bookwalker_url && (
    <a
      href={bonusResult.bonusRecommendation.bookwalker_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderRadius: "12px",
        backgroundColor: "#f97316",
        color: "#ffffff",
        padding: isMobile ? "10px 12px" : "10px 14px",
        textDecoration: "none",
        fontSize: isMobile ? "13px" : "14px",
        fontWeight: 700,
      }}
    >
      BOOK☆WALKERで読む
    </a>
  )}

  {bonusResult.bonusRecommendation.rakuten_kobo_url && (
  <a
    href={bonusResult.bonusRecommendation.rakuten_kobo_url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      borderRadius: "12px",
      backgroundColor: "#bf0000",
      color: "#ffffff",
      padding: isMobile ? "10px 12px" : "10px 14px",
      textDecoration: "none",
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: 700,
    }}
  >
    楽天Koboで読む
  </a>
)}

  {bonusResult.bonusRecommendation.honto_url && (
    <a
      href={bonusResult.bonusRecommendation.honto_url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        color: "#111827",
        border: "1px solid #d1d5db",
        padding: isMobile ? "10px 12px" : "10px 14px",
        textDecoration: "none",
        fontSize: isMobile ? "13px" : "14px",
        fontWeight: 700,
      }}
    >
      hontoで読む
    </a>
  )}
</div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {bonusResult.bonusRecommendation.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      borderRadius: "9999px",
                      backgroundColor: "#f3f4f6",
                      padding: isMobile ? "5px 8px" : "6px 10px",
                      fontSize: isMobile ? "12px" : "13px",
                      color: "#374151",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>



            </article>
          </section>
        )}

<section
  style={{
    marginBottom: isMobile ? "16px" : "24px",
    borderRadius: isMobile ? "20px" : "24px",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    padding: isMobile ? "14px" : "18px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      flexWrap: "nowrap",
    }}
  >
    <button
      type="button"
      onClick={handleNativeShare}
      aria-label="共有する"
      title="共有する"
      style={{
        width: isMobile ? "42px" : "46px",
        height: isMobile ? "42px" : "46px",
        borderRadius: "9999px",
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        color: "#111827",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ShareIcon />
    </button>

    <a
      href={xShareUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Xでシェア"
      title="Xでシェア"
      style={{
        width: isMobile ? "42px" : "46px",
        height: isMobile ? "42px" : "46px",
        borderRadius: "9999px",
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        color: "#111827",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <XIcon />
    </a>

    <a
      href={lineShareUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LINEでシェア"
      title="LINEでシェア"
      style={{
        width: isMobile ? "42px" : "46px",
        height: isMobile ? "42px" : "46px",
        borderRadius: "9999px",
        border: "1px solid #d1d5db",
        backgroundColor: "#06C755",
        color: "#ffffff",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <LineIcon />
    </a>

    <button
      type="button"
      onClick={handleCopyShareText}
      aria-label="シェア文をコピー"
      title="シェア文をコピー"
      style={{
        width: isMobile ? "42px" : "46px",
        height: isMobile ? "42px" : "46px",
        borderRadius: "9999px",
        border: "1px solid #d1d5db",
        backgroundColor: "#ffffff",
        color: "#111827",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CopyIcon />
    </button>
  </div>
</section>

        <div
  style={{
    display: "flex",
    gap: "12px",
    flexDirection: isMobile ? "column" : "row",
    marginTop: "8px",
  }}
>
  <a
    href="/diagnosis"
    style={{
      borderRadius: "16px",
      backgroundColor: "#ea580c",
      color: "#ffffff",
      padding: isMobile ? "14px 18px" : "16px 24px",
      textDecoration: "none",
      fontWeight: 700,
      display: "inline-block",
      width: isMobile ? "100%" : "auto",
      textAlign: "center",
      boxSizing: "border-box",
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
      padding: isMobile ? "14px 18px" : "16px 24px",
      textDecoration: "none",
      fontWeight: 700,
      display: "inline-block",
      width: isMobile ? "100%" : "auto",
      textAlign: "center",
      boxSizing: "border-box",
    }}
  >
    トップに戻る
  </a>
</div>
      </div>
    </main>
  );
}