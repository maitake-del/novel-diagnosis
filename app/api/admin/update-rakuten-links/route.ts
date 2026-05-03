import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Novel = {
  id: number;
  title: string;
  author: string | null;
  rakuten_url: string | null;
  rakuten_kobo_url: string | null;
};

type RakutenItem = {
  title?: string;
  author?: string;
  affiliateUrl?: string;
};

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function normalizeText(value: string) {
  return value
    .replace(/\s+/g, "")
    .replace(/[　]/g, "")
    .replace(/[【】「」『』（）()]/g, "")
    .toLowerCase();
}

function isGoodMatch(novel: Novel, item: RakutenItem) {
  const novelTitle = normalizeText(novel.title);
  const resultTitle = normalizeText(item.title ?? "");

  if (!resultTitle) return false;

  const titleMatches =
    resultTitle.includes(novelTitle) || novelTitle.includes(resultTitle);

  if (!novel.author || !item.author) {
    return titleMatches;
  }

  const novelAuthor = normalizeText(novel.author);
  const resultAuthor = normalizeText(item.author);

  const authorMatches =
    resultAuthor.includes(novelAuthor) || novelAuthor.includes(resultAuthor);

  return titleMatches && authorMatches;
}

async function searchRakutenAffiliateUrl(args: {
  novel: Novel;
  apiUrl: string;
}) {
  const { novel, apiUrl } = args;

  const url = new URL(apiUrl);

  url.searchParams.set("applicationId", process.env.RAKUTEN_APPLICATION_ID!);
  url.searchParams.set("accessKey", process.env.RAKUTEN_ACCESS_KEY!);
  url.searchParams.set("affiliateId", process.env.RAKUTEN_AFFILIATE_ID!);
  url.searchParams.set("format", "json");
  url.searchParams.set("formatVersion", "2");
  url.searchParams.set("hits", "5");
  url.searchParams.set("title", novel.title);

  if (novel.author) {
    url.searchParams.set("author", novel.author);
  }

 const res = await fetch(url.toString(), {
  headers: {
    "User-Agent": "monogatari-compass/1.0",
    Referer: process.env.RAKUTEN_REFERER_URL!,
  },
  cache: "no-store",
});

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Rakuten API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  const items: RakutenItem[] = data.Items ?? [];

  const bestItem =
    items.find((item) => isGoodMatch(novel, item)) ?? items[0] ?? null;

  return bestItem?.affiliateUrl ?? null;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  const secret = req.headers.get("x-admin-secret");

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: novels, error } = await supabaseAdmin
    .from("novels")
    .select("id, title, author, rakuten_url, rakuten_kobo_url")
    .eq("is_active", true)
    .or("rakuten_url.is.null,rakuten_kobo_url.is.null")
    .limit(3);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = [];

  for (const novel of novels as Novel[]) {
    const updateData: {
      rakuten_url?: string;
      rakuten_kobo_url?: string;
    } = {};

    const result: Record<string, unknown> = {
      id: novel.id,
      title: novel.title,
    };

    try {
      if (!novel.rakuten_url) {
        const booksAffiliateUrl = await searchRakutenAffiliateUrl({
          novel,
          apiUrl:
            "https://openapi.rakuten.co.jp/services/api/BooksBook/Search/20170404",
        });

        if (booksAffiliateUrl) {
          updateData.rakuten_url = booksAffiliateUrl;
          result.books = "updated";
        } else {
          result.books = "not_found";
        }

        await wait(3000);
      } else {
        result.books = "already_exists";
      }

      if (!novel.rakuten_kobo_url) {
        const koboAffiliateUrl = await searchRakutenAffiliateUrl({
          novel,
          apiUrl:
            "https://openapi.rakuten.co.jp/services/api/Kobo/EbookSearch/20170426",
        });

        if (koboAffiliateUrl) {
          updateData.rakuten_kobo_url = koboAffiliateUrl;
          result.kobo = "updated";
        } else {
          result.kobo = "not_found";
        }

        await wait(3000);
      } else {
        result.kobo = "already_exists";
      }

      if (Object.keys(updateData).length > 0) {
        const { error: updateError } = await supabaseAdmin
          .from("novels")
          .update(updateData)
          .eq("id", novel.id);

        if (updateError) {
          result.status = "update_error";
          result.error = updateError.message;
        } else {
          result.status = "updated";
        }
      } else {
        result.status = "no_update";
      }

      results.push(result);
    } catch (e) {
      results.push({
        id: novel.id,
        title: novel.title,
        status: "error",
        error: e instanceof Error ? e.message : "unknown error",
      });
    }
  }

  return NextResponse.json({
    updatedCount: results.filter((r) => r.status === "updated").length,
    results,
  });
}