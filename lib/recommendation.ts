export type ScoreKey =
  | "emotion"
  | "world"
  | "thrill"
  | "reflection"
  | "healing"
  | "tempo";

export type UserScores = Record<ScoreKey, number>;

export type Novel = {
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
  kindle_url?: string | null;
bookwalker_url?: string | null;
honto_url?: string | null;
rakuten_url?: string | null;
rakuten_kobo_url?: string | null;
};

export type RecommendedNovel = Novel & {
  matchScore: number;
  matchedTraits: string[];
};

export const scoreLabels: Record<ScoreKey, string> = {
  emotion: "感情移入",
  world: "世界観",
  thrill: "緊張感",
  reflection: "思索",
  healing: "癒やし",
  tempo: "テンポ",
};

const scoreKeys: ScoreKey[] = [
  "emotion",
  "world",
  "thrill",
  "reflection",
  "healing",
  "tempo",
];

export const normalizeUserScores = (scores: UserScores): UserScores => {
  const maxValue = Math.max(...Object.values(scores), 1);

  return {
    emotion: Math.round((scores.emotion / maxValue) * 10),
    world: Math.round((scores.world / maxValue) * 10),
    thrill: Math.round((scores.thrill / maxValue) * 10),
    reflection: Math.round((scores.reflection / maxValue) * 10),
    healing: Math.round((scores.healing / maxValue) * 10),
    tempo: Math.round((scores.tempo / maxValue) * 10),
  };
};

const getTopTraits = (scores: UserScores, count = 2): ScoreKey[] => {
  return [...scoreKeys]
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, count);
};

export const recommendNovels = (
  rawUserScores: UserScores,
  novels: Novel[],
  count = 5
): RecommendedNovel[] => {
  const userScores = normalizeUserScores(rawUserScores);
  const topTraits = getTopTraits(userScores, 2);

  return novels
    .map((novel) => {
      let similarity = 0;

      for (const key of scoreKeys) {
        similarity += 10 - Math.abs(userScores[key] - novel[key]);
      }

      let bonus = 0;

      for (const key of topTraits) {
        bonus += novel[key];
      }

      const matchedTraits = topTraits
        .filter((key) => novel[key] >= 7)
        .map((key) => scoreLabels[key]);

      return {
        ...novel,
        matchScore: similarity + bonus,
        matchedTraits,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, count);
};