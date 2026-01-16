'use client';

import { Download, ExternalLink, Printer, Smartphone, Store, Upload } from 'lucide-react';

/**
 * ガイドタブコンポーネント
 * コンビニでのネットワークプリント方法を解説
 * @returns {JSX.Element} ガイドタブ要素
 */
export default function GuideTab() {
  const printServices = [
    {
      name: 'セブンイレブン',
      service: 'ネットプリント',
      steps: [
        'ネットプリントにユーザー登録',
        'PDFファイルをアップロード',
        '発行された予約番号をメモ',
        'セブンイレブンのマルチコピー機で「ネットプリント」を選択',
        '予約番号を入力して印刷',
      ],
      url: 'https://www.printing.ne.jp/',
    },
    {
      name: 'ファミリーマート / ローソン',
      service: 'ネットワークプリント',
      steps: [
        'ネットワークプリントにユーザー登録',
        'PDFファイルをアップロード',
        '発行されたユーザー番号をメモ',
        'マルチコピー機で「ネットワークプリント」を選択',
        'ユーザー番号を入力して印刷',
      ],
      url: 'https://networkprint.ne.jp/',
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* PDFの保存方法 */}
      <div className="glass-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Download className="h-6 w-6 text-[var(--primary)]" />
          PDFファイルの保存方法
        </h2>

        <div className="space-y-4">
          {/* iOS */}
          <div className="rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[var(--secondary)]" />
              <h3 className="font-semibold">iPhone / iPad（iOS）</h3>
            </div>
            <ol className="list-inside list-decimal space-y-2 text-sm text-gray-300">
              <li>「PDF出力」ボタンをタップ</li>
              <li>
                画面下部に表示される共有シートで
                <span className="mx-1 rounded bg-[var(--surface-light)] px-1">
                  「ファイル」に保存
                </span>
                を選択
              </li>
              <li>保存先フォルダを選択（iCloud Drive または「このiPhone内」）</li>
              <li>右上の「保存」をタップ</li>
            </ol>
            <p className="mt-3 text-xs text-gray-500">
              ※
              Safariでダウンロードした場合は「ファイル」アプリの「ダウンロード」フォルダに保存されます
            </p>
          </div>

          {/* Android */}
          <div className="rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[var(--success)]" />
              <h3 className="font-semibold">Android</h3>
            </div>
            <ol className="list-inside list-decimal space-y-2 text-sm text-gray-300">
              <li>「PDF出力」ボタンをタップ</li>
              <li>自動的に「ダウンロード」フォルダに保存されます</li>
              <li>
                通知バーまたは「ファイル」アプリで
                <span className="mx-1 rounded bg-[var(--surface-light)] px-1">ダウンロード</span>
                フォルダを開く
              </li>
            </ol>
            <p className="mt-3 text-xs text-gray-500">
              ※ Chromeの場合、ダウンロード完了後に通知が表示されます
            </p>
          </div>
        </div>
      </div>

      {/* アップロード方法 */}
      <div className="glass-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Upload className="h-6 w-6 text-[var(--primary)]" />
          印刷サービスへのアップロード方法
        </h2>

        <div className="space-y-4">
          {/* iOS */}
          <div className="rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[var(--secondary)]" />
              <h3 className="font-semibold">iPhone / iPad（iOS）</h3>
            </div>
            <ol className="list-inside list-decimal space-y-2 text-sm text-gray-300">
              <li>印刷サービスのWebサイトにアクセス（下記リンク参照）</li>
              <li>「ファイルを選択」または「アップロード」ボタンをタップ</li>
              <li>
                <span className="rounded bg-[var(--surface-light)] px-1">「ファイルを選択」</span>
                →「ブラウズ」を選択
              </li>
              <li>保存したPDFファイルを選択してアップロード</li>
            </ol>
          </div>

          {/* Android */}
          <div className="rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[var(--success)]" />
              <h3 className="font-semibold">Android</h3>
            </div>
            <ol className="list-inside list-decimal space-y-2 text-sm text-gray-300">
              <li>印刷サービスのWebサイトにアクセス（下記リンク参照）</li>
              <li>「ファイルを選択」または「アップロード」ボタンをタップ</li>
              <li>ファイルマネージャーが開くので「ダウンロード」フォルダを選択</li>
              <li>保存したPDFファイルを選択してアップロード</li>
            </ol>
          </div>
        </div>
      </div>

      {/* コンビニプリントガイド */}
      <div className="glass-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Printer className="h-6 w-6 text-[var(--primary)]" />
          コンビニプリントガイド
        </h2>

        <p className="mb-6 text-gray-400">
          出力したPDFファイルは、以下のサービスを利用してコンビニで印刷できます。
        </p>

        <div className="space-y-6">
          {printServices.map((service) => (
            <div
              className="rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-4"
              key={service.name}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-[var(--secondary)]" />
                  <h3 className="font-semibold">{service.name}</h3>
                </div>
                <a
                  className="flex items-center gap-1 text-sm text-[var(--primary)] transition-colors hover:text-[var(--primary-light)]"
                  href={service.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {service.service}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <ol className="list-inside list-decimal space-y-1 text-sm text-gray-300">
                {service.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-[var(--warning)]/30 bg-[var(--warning)]/10 p-4">
          <h3 className="mb-2 font-semibold text-[var(--warning)]">注意事項</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
            <li>印刷には各サービスへのユーザー登録が必要です</li>
            <li>印刷料金は各コンビニによって異なります（通常A4白黒で20円程度）</li>
            <li>アップロードしたファイルには有効期限があります</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
