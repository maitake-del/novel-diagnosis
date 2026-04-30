"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
 <>
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "物語コンパス",
          alternateName: ["Monogatari Compass", "Novel Compass"],
          url: "https://novel-diagnosis.vercel.app/",
        }),
      }}
    />

    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fef3c7, #ffedd5)",
        color: "#111827",
        padding: isMobile ? "20px 12px" : "40px 24px",
      }}>
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            marginBottom: isMobile ? "16px" : "24px",
            alignSelf: "flex-start",
            border: "1px solid #fed7aa",
            borderRadius: "9999px",
            backgroundColor: "rgba(255,255,255,0.85)",
            padding: isMobile ? "6px 12px" : "8px 16px",
            fontSize: isMobile ? "12px" : "14px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          AIがあなたに合う小説を診断
        </div>

     <h1
          style={{
            marginBottom: isMobile ? "16px" : "24px",
            textAlign: "center",
            fontSize: isMobile ? "32px" : "56px",
            lineHeight: 1.2,
            fontWeight: 800,
          }}
        >
          あなたにぴったりの
          <br />
          小説を見つけるサイト
        </h1>

        <p
          style={{
            maxWidth: "800px",
            margin: isMobile ? "0 auto 24px auto" : "0 auto 40px auto",
            textAlign: "center",
            fontSize: isMobile ? "15px" : "20px",
            lineHeight: isMobile ? 1.7 : 1.8,
            color: "#374151",
          }}
        >
          少し変わった質問への答えから
          AIがあなたの読書傾向を分析。
          今のあなたに合う小説を、おすすめ理由つきで紹介します。
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: isMobile ? "32px" : "64px",
          }}
        >
          <a
            href="/diagnosis"
            style={{
              borderRadius: "16px",
              backgroundColor: "#f97316",
              color: "#ffffff",
              padding: isMobile ? "14px 18px" : "16px 32px",
              textDecoration: "none",
              fontWeight: 700,
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              textAlign: "center",
              width: isMobile ? "100%" : "auto",
              boxSizing: "border-box",
            }}
          >
            診断を始める
          </a>

          <a
            href="#about"
            style={{
              borderRadius: "16px",
              border: "1px solid #fdba74",
              backgroundColor: "#ffffff",
              color: "#111827",
              padding: isMobile ? "14px 18px" : "16px 32px",
              textDecoration: "none",
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              textAlign: "center",
              width: isMobile ? "100%" : "auto",
              boxSizing: "border-box",
            }}
          >
            サービスを見る
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(3, minmax(0, 1fr))",
            gap: isMobile ? "16px" : "24px",
            marginBottom: isMobile ? "32px" : "80px",
          }}
        >
          <div
            style={{
              borderRadius: "24px",
              backgroundColor: "#ffffff",
              padding: isMobile ? "16px" : "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "12px",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 700,
              }}
            >
              1. 質問に答える
            </h2>
            <p
              style={{
                fontSize: isMobile ? "14px" : "15px",
                lineHeight: isMobile ? 1.7 : 1.8,
                color: "#4b5563",
              }}
            >
              読書の好みや雰囲気、価値観がわかる質問に答えるだけです。
            </p>
          </div>

          <div
            style={{
              borderRadius: "24px",
              backgroundColor: "#ffffff",
              padding: isMobile ? "16px" : "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "12px",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 700,
              }}
            >
              2. AIが分析
            </h2>
            <p
              style={{
                fontSize: isMobile ? "14px" : "15px",
                lineHeight: isMobile ? 1.7 : 1.8,
                color: "#4b5563",
              }}
            >
              あなたの性格傾向や、物語に求めるものをAIが読み解きます。
            </p>
          </div>

          <div
            style={{
              borderRadius: "24px",
              backgroundColor: "#ffffff",
              padding: isMobile ? "16px" : "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "12px",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: 700,
              }}
            >
              3. 小説を推薦
            </h2>
            <p
              style={{
                fontSize: isMobile ? "14px" : "15px",
                lineHeight: isMobile ? 1.7 : 1.8,
                color: "#4b5563",
              }}
            >
              おすすめの小説を、理由つきで3〜5冊紹介します。
            </p>
          </div>
        </div>

        <section
          id="about"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: isMobile ? "20px" : "28px",
            padding: isMobile ? "20px" : "40px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "24px",
              fontSize: isMobile ? "24px" : "36px",
              fontWeight: 800,
            }}
          >
            こんな人におすすめ
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(2, minmax(0, 1fr))",
              gap: isMobile ? "16px" : "24px",
            }}
          >
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "24px",
                padding: isMobile ? "16px" : "24px",
              }}
            >
              <h3
                style={{
                  marginBottom: "12px",
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: 700,
                }}
              >
                次に読む一冊がわからない
              </h3>
              <p
                style={{
                  lineHeight: isMobile ? 1.7 : 1.8,
                  fontSize: isMobile ? "14px" : "16px",
                  color: "#4b5563",
                }}
              >
                有名作品が多すぎて、自分に本当に合う作品を見つけにくい人向けです。
              </p>
            </div>

            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "24px",
                padding: isMobile ? "16px" : "24px",
              }}
            >
              <h3
                style={{
                  marginBottom: "12px",
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: 700,
                }}
              >
                気分に合う物語を読みたい
              </h3>
              <p
                style={{
                  lineHeight: isMobile ? 1.7 : 1.8,
                  fontSize: isMobile ? "14px" : "16px",
                  color: "#4b5563",
                }}
              >
                今の自分に合った、癒やし・刺激・余韻のある物語を探せます。
              </p>
            </div>
          </div>
        </section>
      </section>

      <p
  style={{
    marginTop: "24px",
    fontSize: "12px",
    lineHeight: 1.6,
    color: "#6b7280",
  }}
>
  当サイトはアフィリエイトプログラムを利用しています。
</p>
    </main>
  </>
);
}