'use client';

import { X } from 'lucide-react';

/**
 * サービス概要モーダルコンポーネント
 * アプリケーションの目的と使い方を説明する
 * @param {object} props - コンポーネントプロパティ
 * @param {boolean} props.isOpen - モーダルの表示状態
 * @param {function} props.onClose - モーダルを閉じる際のコールバック関数
 * @returns {JSX.Element|null} モーダル要素またはnull
 */
export default function ServiceInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-fade-in glass-card max-h-[80vh] w-full max-w-lg overflow-y-auto p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="gradient-text text-xl font-bold">サービス概要</h2>
          <button
            className="rounded-full p-1 transition-colors hover:bg-[var(--surface-light)]"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-300">
          <section>
            <h3 className="mb-2 font-semibold text-white">目的</h3>
            <p>
              このアプリケーションは、性交渉における両者の自由な意思に基づく同意を確認し、
              その記録を残すための補助ツールです。法的効力はありませんが、
              お互いの意思を明確にすることで、安心してコミュニケーションを取ることができます。
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">使い方</h3>
            <ol className="list-inside list-decimal space-y-1">
              <li>両者の氏名を入力します</li>
              <li>5つの意思確認項目すべてに回答します</li>
              <li>必要に応じて詳細条件を追加します</li>
              <li>PDFとして出力・印刷します</li>
            </ol>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">QRコード機能</h3>
            <p>
              入力した内容をQRコードとして生成し、相手のスマートフォンで読み取ることで
              簡単にデータを共有できます。
            </p>
          </section>

          <section className="rounded-lg border border-[var(--warning)]/30 bg-[var(--warning)]/10 p-3">
            <h3 className="mb-2 font-semibold text-[var(--warning)]">重要な注意事項</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>本アプリは法的拘束力を持ちません</li>
              <li>同意はいつでも撤回可能です</li>
              <li>脅迫・強要・泥酔状態での同意は無効です</li>
            </ul>
          </section>
        </div>

        <button
          className="btn-glow mt-6 w-full rounded-lg bg-[var(--primary)] py-2 font-medium transition-all hover:bg-[var(--primary-light)]"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
