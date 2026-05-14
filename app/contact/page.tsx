import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ｜物語コンパス",
  description: "物語コンパスへのお問い合わせページです。",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold">お問い合わせ</h1>

      <p className="mb-4 leading-7">
        物語コンパスに関するお問い合わせは、以下のメールアドレスまでお願いいたします。
      </p>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="font-semibold">お問い合わせ先</p>
        <p className="mt-2">
          <a
            href="mailto:kasakiyuki1024@gmail.com"
            className="text-blue-600 underline"
          >
            fidvb47611@yahoo.co.jp
          </a>
        </p>
      </div>
    </main>
  );
}