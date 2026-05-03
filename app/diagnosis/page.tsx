"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: number;
  text: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "雨の日に読みたいのは？",
    options: ["静かな物語", "不穏な物語", "心があたたまる物語", "謎が深まる物語"],
  },
  {
    id: 2,
    text: "小説でいちばん大事なのは？",
    options: ["ストーリー", "登場人物", "世界観", "文章の美しさ"],
  },
  {
    id: 3,
    text: "読後にほしい感覚は？",
    options: ["元気が出る", "泣ける", "考えさせられる", "ドキドキする"],
  },
  {
    id: 4,
    text: "主人公になるならどれに近い？",
    options: ["現実で悩みながら生きる人", "非日常に巻き込まれる人", "誰かを支える人", "秘密を抱える人"],
  },
  {
    id: 5,
    text: "惹かれる場所は？",
    options: ["路地裏の古本屋", "近未来の巨大都市", "誰もいない海辺", "謎の多い洋館"],
  },
  {
    id: 6,
    text: "苦手な作品は？",
    options: ["展開が遅すぎる", "感情が重すぎる", "難解すぎる", "軽すぎる"],
  },
  {
    id: 7,
    text: "休日の午後に読みたいのは？",
    options: ["ゆっくり浸れる物語", "一気読みしたくなる物語", "不思議な世界に行ける物語", "人の心が丁寧に描かれる物語"],
  },
  {
    id: 8,
    text: "物語の始まり方で好きなのは？",
    options: ["静かな日常から始まる", "最初から事件が起こる", "謎を残して始まる", "美しい情景から始まる"],
  },
  {
    id: 9,
    text: "好きな主人公は？",
    options: ["不器用だけど優しい人", "強い意志で進む人", "どこか変わっている人", "弱さを抱えた人"],
  },
  {
    id: 10,
    text: "物語のテンポはどれが好き？",
    options: ["ゆっくり丁寧", "ほどよく進む", "速くて止まらない", "緩急が激しい"],
  },
  {
    id: 11,
    text: "読んでみたいテーマは？",
    options: ["孤独とつながり", "成長と挑戦", "生きることの意味", "真実と嘘"],
  },
  {
    id: 12,
    text: "結末に求めるものは？",
    options: ["きれいに納得したい", "少し切なさが残ってほしい", "衝撃を受けたい", "解釈を考え続けたい"],
  },
  {
    id: 13,
    text: "本を閉じたあと理想なのは？",
    options: ["誰かに勧めたくなる", "しばらく余韻に浸る", "もう一度最初から考え直したくなる", "続きが気になって仕方ない"],
  },
  {
    id: 14,
    text: "次のうち今の気分に近いのは？",
    options: ["落ち着きたい", "刺激がほしい", "現実から少し離れたい", "深く考えたい"],
  },
  {
    id: 15,
    text: "表紙を見て手に取りたくなるのは？",
    options: ["静かで余白のあるデザイン", "鮮やかで印象の強いデザイン", "不思議さのあるデザイン", "少し暗くて意味深なデザイン"],
  },
];

export default function DiagnosisPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = Math.round((answeredCount / questions.length) * 100);

  const handleSelect = (questionId: number, optionLabel: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel,
    }));
  };

  

  const handleSubmit = async () => {
    if (answeredCount < questions.length) {
      alert("すべての質問に答えてください。");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "診断に失敗しました。");
      }
     

      sessionStorage.setItem("diagnosisResult", JSON.stringify(json));
     router.push("/result");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "不明なエラーが発生しました。";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f4",
        color: "#111827",
        padding: isMobile ? "20px 12px" : "40px 24px",
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
            marginBottom: isMobile ? "20px" : "32px",
          }}
        >
          <p
            style={{
              marginBottom: "8px",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 700,
              color: "#c2410c",
            }}
          >
            小説診断
          </p>

          <h1
            style={{
              marginBottom: "12px",
              fontSize: isMobile ? "28px" : "48px",
              lineHeight: 1.2,
              fontWeight: 800,
              color: "#111827",
            }}
          >
            あなたの読書タイプを診断します
          </h1>

          <p
            style={{
              fontSize: isMobile ? "15px" : "18px",
              lineHeight: isMobile ? 1.7 : 1.8,
              color: "#374151",
            }}
          >
            少し変わった質問に答えて、今のあなたの読書傾向を見つけましょう。
          </p>
        </div>

        <div
          style={{
            marginBottom: isMobile ? "20px" : "32px",
            border: "1px solid #d1d5db",
            borderRadius: "16px",
            backgroundColor: "#ffffff",
            padding: isMobile ? "14px" : "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              fontSize: isMobile ? "13px" : "14px",
              color: "#374151",
            }}
          >
            <span>進捗</span>
            <span>
              {answeredCount} / {questions.length}
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: isMobile ? "10px" : "12px",
              borderRadius: "9999px",
              backgroundColor: "#fed7aa",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: isMobile ? "10px" : "12px",
                backgroundColor: "#ea580c",
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gap: isMobile ? "16px" : "24px" }}>
          {questions.map((question, index) => (
            <section
              key={question.id}
              style={{
                border: "1px solid #d1d5db",
                borderRadius: isMobile ? "20px" : "24px",
                backgroundColor: "#ffffff",
                padding: isMobile ? "16px" : "24px",
              }}
            >
              <p
                style={{
                  marginBottom: "8px",
                  fontSize: isMobile ? "13px" : "14px",
                  color: "#c2410c",
                  fontWeight: 600,
                }}
              >
                Question {index + 1}
              </p>

              <h2
                style={{
                  marginBottom: isMobile ? "14px" : "20px",
                  fontSize: isMobile ? "20px" : "28px",
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.4,
                }}
              >
                {question.text}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "repeat(2, minmax(0, 1fr))",
                  gap: "12px",
                }}
              >
                {question.options.map((option) => {
                  const selected = answers[question.id] === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(question.id, option)}
                      style={{
                        border: selected ? "2px solid #ea580c" : "1px solid #d1d5db",
                        borderRadius: "16px",
                        padding: isMobile ? "14px" : "16px",
                        textAlign: "left",
                        backgroundColor: selected ? "#ffedd5" : "#ffffff",
                        color: "#111827",
                        fontSize: isMobile ? "14px" : "16px",
                        lineHeight: 1.5,
                        cursor: "pointer",
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div
          style={{
            marginTop: isMobile ? "20px" : "32px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <button
            type="button"
            onClick={handleSubmit}
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
            {loading ? "診断中...　診断には1分程かかる場合があります" : "診断結果を見る"}
          </button>

          <a
            href="/"
            style={{
              border: "1px solid #9ca3af",
              borderRadius: "16px",
              padding: isMobile ? "14px 18px" : "16px 24px",
              backgroundColor: "#ffffff",
              color: "#111827",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
              width: isMobile ? "100%" : "auto",
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