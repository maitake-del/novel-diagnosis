import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { recommendNovels, type UserScores } from "@/lib/recommendation";
import { gemini, GEMINI_MODEL } from "@/lib/gemini";

type BonusAIResult = {
  bonusBookId: number;
  bonusReason: string;
  freeTextAnalysis: string;
};

async function generateBonusRecommendation(args: {
  scores: UserScores;
  freeText: string;
  candidates: {
    id: number;
    title: string;
    author: string;
    description: string;
    tags: string[];
  }[];
}): Promise<BonusAIResult> {
  const fallback: BonusAIResult = {
    bonusBookId: args.candidates[0]?.id ?? 0,
    bonusReason: "自由記述の雰囲気に合いやすい一冊です。",
    freeTextAnalysis:
      "自由記述から、読みたい雰囲気や避けたい要素を補足して解釈しました。",
  };

  try {
    const prompt = `
あなたは日本語の小説レコメンド編集者です。
自由記述と候補本を見て、追加で1冊だけ選んでください。
必ずJSONだけを返してください。
Markdownは不要です。

条件:
- bonusBookId は candidates の id から1つ選ぶ
- bonusReason は 80〜120文字
- freeTextAnalysis は 1〜2文で自然な日本語
- candidates にない id は使わない

入力データ:
${JSON.stringify(args, null, 2)}
`.trim();

    const response = await gemini.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            bonusBookId: { type: "integer" },
            bonusReason: { type: "string" },
            freeTextAnalysis: { type: "string" },
          },
          required: ["bonusBookId", "bonusReason", "freeTextAnalysis"],
        },
      },
    });

    const parsed = JSON.parse(response.text ?? "{}") as BonusAIResult;

    if (
      typeof parsed.bonusBookId !== "number" ||
      typeof parsed.bonusReason !== "string" ||
      typeof parsed.freeTextAnalysis !== "string"
    ) {
      return fallback;
    }

    return parsed;
  } catch {
    return fallback;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const scores = body.scores as UserScores;
    const freeText = (body.freeText as string | undefined)?.trim() ?? "";
    const excludeIds = Array.isArray(body.excludeIds)
      ? (body.excludeIds as number[])
      : [];

    if (!scores || !freeText) {
      return NextResponse.json(
        { error: "自由記述と診断スコアが必要です。" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("novels")
      .select(
        "id, title, author, description, tags, emotion, world, thrill, reflection, healing, tempo, is_active, kindle_url, bookwalker_url, honto_url, rakuten_kobo_url"
      )
      .eq("is_active", true);

    if (error) {
      return NextResponse.json(
        { error: "小説データの取得に失敗しました。" },
        { status: 500 }
      );
    }

    const rankedBooks = recommendNovels(scores, data ?? [], 12).filter(
      (book) => !excludeIds.includes(book.id)
    );

    const candidates = rankedBooks.slice(0, 5);

    if (candidates.length === 0) {
      return NextResponse.json(
        { error: "追加候補の小説が見つかりませんでした。" },
        { status: 400 }
      );
    }

    const ai = await generateBonusRecommendation({
      scores,
      freeText,
      candidates: candidates.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        tags: book.tags,
      })),
    });

    const selectedBook =
      candidates.find((book) => book.id === ai.bonusBookId) ?? candidates[0];

    return NextResponse.json({
      freeText,
      freeTextAnalysis: ai.freeTextAnalysis,
      bonusRecommendation: {
        ...selectedBook,
        aiReason: ai.bonusReason,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "追加レコメンドの生成に失敗しました。" },
      { status: 500 }
    );
  }
}