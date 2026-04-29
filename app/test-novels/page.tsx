"use client";

import { useEffect, useState } from "react";

type Novel = {
  id: number;
  title: string;
  author: string;
  description: string;
  tags: string[];
  emotion: number;
  world: number;
  thrill: number;
  reflection: number;
  healing: number;
  tempo: number;
  is_active: boolean;
};

export default function TestNovelsPage() {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const res = await fetch("/api/novels");
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.error || "本の取得に失敗しました。");
        }

        setNovels(json.novels ?? []);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "不明なエラーです。";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f4",
        padding: "40px 24px",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "24px" }}>
          novels テーブル確認
        </h1>

        {loading && <p>読み込み中です...</p>}
        {error && <p style={{ color: "#b91c1c" }}>{error}</p>}

        <div style={{ display: "grid", gap: "16px" }}>
          {novels.map((novel) => (
            <article
              key={novel.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "6px" }}>
                {novel.title}
              </h2>
              <p style={{ color: "#9a3412", fontWeight: 700, marginBottom: "10px" }}>
                {novel.author}
              </p>
              <p style={{ color: "#374151", lineHeight: 1.7, marginBottom: "10px" }}>
                {novel.description}
              </p>
              <p style={{ fontSize: "14px", color: "#4b5563" }}>
                tags: {novel.tags.join(" / ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}