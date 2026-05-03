import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  recommendNovels,
  type ScoreKey,
  type UserScores,
} from "@/lib/recommendation";
import { gemini, GEMINI_MODEL } from "@/lib/gemini";

type Option = {
  label: string;
  scores: Partial<Record<ScoreKey, number>>;
};

type Question = {
  id: number;
  text: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "雨の日に読みたいのは？",
    options: [
      { label: "静かな物語", scores: { healing: 2, reflection: 2, emotion: 1 } },
      { label: "不穏な物語", scores: { thrill: 2, reflection: 1 } },
      { label: "心があたたまる物語", scores: { healing: 2, emotion: 2 } },
      { label: "謎が深まる物語", scores: { thrill: 2, reflection: 1 } },
    ],
  },
  {
    id: 2,
    text: "小説でいちばん大事なのは？",
    options: [
      { label: "ストーリー", scores: { tempo: 2, thrill: 1 } },
      { label: "登場人物", scores: { emotion: 2, healing: 1 } },
      { label: "世界観", scores: { world: 2, reflection: 1 } },
      { label: "文章の美しさ", scores: { reflection: 2, healing: 1 } },
    ],
  },
  {
    id: 3,
    text: "読後にほしい感覚は？",
    options: [
      { label: "元気が出る", scores: { healing: 2, emotion: 1 } },
      { label: "泣ける", scores: { emotion: 2, healing: 1 } },
      { label: "考えさせられる", scores: { reflection: 2 } },
      { label: "ドキドキする", scores: { thrill: 2, tempo: 1 } },
    ],
  },
  {
    id: 4,
    text: "主人公になるならどれに近い？",
    options: [
      { label: "現実で悩みながら生きる人", scores: { emotion: 2, reflection: 1 } },
      { label: "非日常に巻き込まれる人", scores: { world: 2, thrill: 1 } },
      { label: "誰かを支える人", scores: { healing: 2, emotion: 1 } },
      { label: "秘密を抱える人", scores: { reflection: 1, thrill: 2 } },
    ],
  },
  {
    id: 5,
    text: "惹かれる場所は？",
    options: [
      { label: "路地裏の古本屋", scores: { reflection: 2, healing: 1 } },
      { label: "近未来の巨大都市", scores: { world: 2, thrill: 1 } },
      { label: "誰もいない海辺", scores: { healing: 2, reflection: 1 } },
      { label: "謎の多い洋館", scores: { thrill: 2, world: 1 } },
    ],
  },
  {
    id: 6,
    text: "苦手な作品は？",
    options: [
      { label: "展開が遅すぎる", scores: { tempo: 2 } },
      { label: "感情が重すぎる", scores: { thrill: 1, tempo: 1 } },
      { label: "難解すぎる", scores: { healing: 1, emotion: 1 } },
      { label: "軽すぎる", scores: { reflection: 2, emotion: 1 } },
    ],
  },
  {
    id: 7,
    text: "休日の午後に読みたいのは？",
    options: [
      { label: "ゆっくり浸れる物語", scores: { healing: 2, reflection: 1 } },
      { label: "一気読みしたくなる物語", scores: { tempo: 2, thrill: 1 } },
      { label: "不思議な世界に行ける物語", scores: { world: 2, healing: 1 } },
      { label: "人の心が丁寧に描かれる物語", scores: { emotion: 2, reflection: 1 } },
    ],
  },
  {
    id: 8,
    text: "物語の始まり方で好きなのは？",
    options: [
      { label: "静かな日常から始まる", scores: { healing: 2, emotion: 1 } },
      { label: "最初から事件が起こる", scores: { thrill: 2, tempo: 1 } },
      { label: "謎を残して始まる", scores: { thrill: 2, reflection: 1 } },
      { label: "美しい情景から始まる", scores: { world: 2, reflection: 1 } },
    ],
  },
  {
    id: 9,
    text: "好きな主人公は？",
    options: [
      { label: "不器用だけど優しい人", scores: { emotion: 2, healing: 1 } },
      { label: "強い意志で進む人", scores: { tempo: 1, thrill: 1 } },
      { label: "どこか変わっている人", scores: { world: 1, reflection: 2 } },
      { label: "弱さを抱えた人", scores: { emotion: 2, reflection: 1 } },
    ],
  },
  {
    id: 10,
    text: "物語のテンポはどれが好き？",
    options: [
      { label: "ゆっくり丁寧", scores: { reflection: 2, healing: 1 } },
      { label: "ほどよく進む", scores: { tempo: 2 } },
      { label: "速くて止まらない", scores: { tempo: 2, thrill: 1 } },
      { label: "緩急が激しい", scores: { thrill: 2, tempo: 1 } },
    ],
  },
  {
    id: 11,
    text: "読んでみたいテーマは？",
    options: [
      { label: "孤独とつながり", scores: { emotion: 2, reflection: 1 } },
      { label: "成長と挑戦", scores: { tempo: 1, healing: 1, emotion: 1 } },
      { label: "生きることの意味", scores: { reflection: 2 } },
      { label: "真実と嘘", scores: { thrill: 1, reflection: 2 } },
    ],
  },
  {
    id: 12,
    text: "結末に求めるものは？",
    options: [
      { label: "きれいに納得したい", scores: { healing: 1, tempo: 1 } },
      { label: "少し切なさが残ってほしい", scores: { emotion: 2, reflection: 1 } },
      { label: "衝撃を受けたい", scores: { thrill: 2 } },
      { label: "解釈を考え続けたい", scores: { reflection: 2, world: 1 } },
    ],
  },
  {
    id: 13,
    text: "本を閉じたあと理想なのは？",
    options: [
      { label: "誰かに勧めたくなる", scores: { emotion: 1, healing: 1 } },
      { label: "しばらく余韻に浸る", scores: { reflection: 2, emotion: 1 } },
      { label: "もう一度最初から考え直したくなる", scores: { reflection: 2, thrill: 1 } },
      { label: "続きが気になって仕方ない", scores: { tempo: 2, thrill: 1 } },
    ],
  },
  {
    id: 14,
    text: "次のうち今の気分に近いのは？",
    options: [
      { label: "落ち着きたい", scores: { healing: 2 } },
      { label: "刺激がほしい", scores: { thrill: 2, tempo: 1 } },
      { label: "現実から少し離れたい", scores: { world: 2, healing: 1 } },
      { label: "深く考えたい", scores: { reflection: 2 } },
    ],
  },
  {
    id: 15,
    text: "表紙を見て手に取りたくなるのは？",
    options: [
      { label: "静かで余白のあるデザイン", scores: { reflection: 2, healing: 1 } },
      { label: "鮮やかで印象の強いデザイン", scores: { tempo: 1, thrill: 1 } },
      { label: "不思議さのあるデザイン", scores: { world: 2, reflection: 1 } },
      { label: "少し暗くて意味深なデザイン", scores: { thrill: 2, reflection: 1 } },
    ],
  },
];

const diagnosisDescriptions: Record<string, string> = {
  "余韻没入型": "静かな余韻や感情の揺れを大切にする読書タイプです。",
  "幻想漂流型": "現実から少し離れて、世界観に浸る読書タイプです。",
  "緊張追求型": "先の読めない展開やスリルに惹かれる読書タイプです。",
  "感情共鳴型": "登場人物の感情に深く入り込む読書タイプです。",
  "思索潜航型": "物語の意味やテーマを深く考えたくなる読書タイプです。",
  "物語疾走型": "テンポのよい展開を楽しむ読書タイプです。",
  "回復読書型": "癒やしや安心感を求める読書タイプです。",
  "世界逃避型": "非日常の空気や設定に惹かれる読書タイプです。",
  "感情没入型": "心の動きを味わうのが好きな読書タイプです。",
  "思索没入型": "読むことを通して深く考えるのが好きな読書タイプです。",
  "世界観没入型": "設定や雰囲気の作り込みを楽しむ読書タイプです。",
  "緊張中毒型": "不穏さや緊張感に惹かれる読書タイプです。",
  "癒やし読書型": "やさしく穏やかな読書体験を求めるタイプです。",
  "展開重視型": "ストーリーの進み方を重視するタイプです。",
  "物語探求型": "幅広い魅力をバランスよく楽しめるタイプです。",
};

type AIBookReason = {
  id: number;
  reason: string;
};

type AIResult = {
  diagnosisSummary: string;
  bookReasons: AIBookReason[];
  bonusBookId: number;
  bonusReason: string;
  freeTextAnalysis: string;
};

async function generateAITexts(args: {
  diagnosisType: string;
  description: string;
  scores: Record<string, number>;
  baseBooks: {
    id: number;
    title: string;
    author: string;
    description: string;
    tags: string[];
  }[];
  bonusCandidates: {
    id: number;
    title: string;
    author: string;
    description: string;
    tags: string[];
  }[];
  freeText: string;
}): Promise<AIResult> {
  const fallback: AIResult = {
    diagnosisSummary: args.description,
    bookReasons: args.baseBooks.map((book) => ({
      id: book.id,
      reason: `${book.title} は、あなたの診断傾向と相性のよい候補です。`,
    })),
    bonusBookId:
      args.bonusCandidates[0]?.id ?? args.baseBooks[0]?.id ?? 0,
    bonusReason: "自由記述の内容に近い雰囲気を持つ一冊です。",
    freeTextAnalysis: args.freeText
      ? "自由記述から、読みたい雰囲気や避けたい要素を補足して解釈しました。"
      : "自由記述は未入力でした。",
  };

  try {
    const prompt = `
あなたは日本語の小説レコメンド編集者です。
以下の情報を見て、必ずJSONだけを返してください。
Markdownや説明文は不要です。

条件:
- diagnosisSummary は 120〜180文字
- 各 reason は 80〜120文字
- bookReasons には baseBooks の id だけを使う
- bonusBookId は bonusCandidates の id から1つ選ぶ
- freeText が空なら、freeTextAnalysis は「自由記述は未入力でした。」でよい

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
            diagnosisSummary: { type: "string" },
            bookReasons: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  reason: { type: "string" },
                },
                required: ["id", "reason"],
              },
            },
            bonusBookId: { type: "integer" },
            bonusReason: { type: "string" },
            freeTextAnalysis: { type: "string" },
          },
          required: [
            "diagnosisSummary",
            "bookReasons",
            "bonusBookId",
            "bonusReason",
            "freeTextAnalysis",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text!) as AIResult;
    return parsed;
  } catch {
    return fallback;
  }
}

const calculateScores = (answers: Record<number, string>) => {
  const totals: UserScores = {
    emotion: 0,
    world: 0,
    thrill: 0,
    reflection: 0,
    healing: 0,
    tempo: 0,
  };

  for (const question of questions) {
    const selectedLabel = answers[question.id];
    const selectedOption = question.options.find(
      (option) => option.label === selectedLabel
    );

    if (!selectedOption) continue;

    for (const key in selectedOption.scores) {
      const scoreKey = key as ScoreKey;
      totals[scoreKey] += selectedOption.scores[scoreKey] ?? 0;
    }
  }

  return totals;
};

const getDiagnosisTypeName = (totals: UserScores) => {
  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key as ScoreKey);

  const first = sorted[0];
  const second = sorted[1];

  if (first === "reflection" && second === "emotion") return "余韻没入型";
  if (first === "world" && second === "healing") return "幻想漂流型";
  if (first === "thrill" && second === "tempo") return "緊張追求型";
  if (first === "emotion" && second === "healing") return "感情共鳴型";
  if (first === "reflection" && second === "world") return "思索潜航型";
  if (first === "tempo" && second === "thrill") return "物語疾走型";
  if (first === "healing" && second === "emotion") return "回復読書型";
  if (first === "world" && second === "thrill") return "世界逃避型";

  if (first === "emotion") return "感情没入型";
  if (first === "reflection") return "思索没入型";
  if (first === "world") return "世界観没入型";
  if (first === "thrill") return "緊張中毒型";
  if (first === "healing") return "癒やし読書型";
  if (first === "tempo") return "展開重視型";

  return "物語探求型";
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const answers = body.answers as Record<number, string>;

    if (!answers || Object.keys(answers).length !== questions.length) {
      return NextResponse.json(
        { error: "15問すべての回答が必要です。" },
        { status: 400 }
      );
    }

    const totals = calculateScores(answers);
    const diagnosisType = getDiagnosisTypeName(totals);
    const description =
      diagnosisDescriptions[diagnosisType] ?? "あなたに合う物語の傾向を診断しました。";

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("novels")
      .select(
        "id, title, author, description, tags, emotion, world, thrill, reflection, healing, tempo, is_active, kindle_url, bookwalker_url, honto_url, rakuten_url, rakuten_kobo_url"
      )
      .eq("is_active", true);

    if (error) {
      return NextResponse.json(
        { error: "小説データの取得に失敗しました。" },
        { status: 500 }
      );
    }

  const rankedBooks = recommendNovels(totals, data ?? [], 5);
const baseBooks = rankedBooks.slice(0, 5);

const ai = await generateAITexts({
  diagnosisType,
  description,
  scores: totals,
  baseBooks: baseBooks.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    tags: book.tags,
  })),
  bonusCandidates: [],
  freeText: "",
});

const recommendedBooks = baseBooks.map((book) => {
  const aiReason =
    ai.bookReasons.find((item) => item.id === book.id)?.reason ??
    `${book.title} は、あなたの診断傾向と相性のよい一冊です。`;

  return {
    ...book,
    aiReason,
  };
});

return NextResponse.json({
  diagnosisType,
  description,
  aiDiagnosisSummary: ai.diagnosisSummary,
  scores: totals,
  recommendedBooks,
});
  } catch {
    return NextResponse.json(
      { error: "診断処理に失敗しました。" },
      { status: 500 }
    );
  }
}