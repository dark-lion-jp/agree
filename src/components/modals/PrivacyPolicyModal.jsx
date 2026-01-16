'use client';

import { X } from 'lucide-react';

/**
 * プライバシーポリシーモーダルコンポーネント
 * データの取り扱いに関するポリシーを説明する
 * @param {object} props - コンポーネントプロパティ
 * @param {boolean} props.isOpen - モーダルの表示状態
 * @param {function} props.onClose - モーダルを閉じる際のコールバック関数
 * @returns {JSX.Element|null} モーダル要素またはnull
 */
export default function PrivacyPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-fade-in glass-card max-h-[80vh] w-full max-w-lg overflow-y-auto p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="gradient-text text-xl font-bold">プライバシーポリシー</h2>
          <button
            className="rounded-full p-1 transition-colors hover:bg-[var(--surface-light)]"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-300">
          <section>
            <h3 className="mb-2 font-semibold text-white">データの保存について</h3>
            <p>
              本アプリケーションは、入力されたすべてのデータをお使いのデバイス上のみで処理します。
              サーバーへのデータ送信は一切行いません。
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">データの永続化</h3>
            <p>
              入力されたデータは、ブラウザのセッション内でのみ保持されます。
              ブラウザを閉じると、すべてのデータが自動的に消去されます。
              意図的にlocalStorageやCookieへの保存は行っていません。
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">PDF出力について</h3>
            <p>
              PDF生成はすべてお使いのデバイス上で行われます。
              生成されたPDFファイルの管理は、ご自身の責任で行ってください。
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">QRコードについて</h3>
            <p>
              QRコードには入力した氏名と詳細条件のみが含まれます。
              カメラを使用したQRコード読み取り機能は、ブラウザのカメラAPIを使用しますが、
              映像データが外部に送信されることはありません。
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-semibold text-white">アクセス解析ツールについて</h3>
            <p>
              本アプリケーションでは、サービス向上のため Google Analytics を使用しています。 Google
              Analytics は、データの収集のために Cookie を使用する可能性があります。
              収集されるデータには、以下の情報が含まれる場合がありますが、個人を特定する情報は含まれません。
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-gray-400">
              <li>デバイス識別情報（デバイスIDなど）</li>
              <li>アプリのアクティビティ（操作履歴、画面表示など）</li>
              <li>おおよその位置情報（国、地域など）</li>
            </ul>
            <p className="mt-2">
              これらのデータは、Google のプライバシーポリシーに基づいて管理されます。
              <br />
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] underline"
              >
                Googleポリシーと規約
              </a>
            </p>
          </section>

          <section className="rounded-lg border border-[var(--success)]/30 bg-[var(--success)]/10 p-3">
            <h3 className="mb-2 font-semibold text-[var(--success)]">
              プライバシーへのコミットメント
            </h3>
            <p>
              私たちはお客様のプライバシーを最優先に考え、同意内容などの機微な個人情報の収集は一切行いません。
            </p>
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
