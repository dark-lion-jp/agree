export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 text-gray-300">
      <h1 className="mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-3xl font-bold text-transparent">
        プライバシーポリシー
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">データの保存について</h2>
          <p>
            本アプリケーションは、入力されたすべてのデータをお使いのデバイス上のみで処理します。
            サーバーへのデータ送信は一切行いません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">データの永続化</h2>
          <p>
            入力されたデータは、ブラウザのセッション内でのみ保持されます。
            ブラウザを閉じると、すべてのデータが自動的に消去されます。
            意図的にlocalStorageやCookieへの保存は行っていません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">PDF出力について</h2>
          <p>
            PDF生成はすべてお使いのデバイス上で行われます。
            生成されたPDFファイルの管理は、ご自身の責任で行ってください。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">QRコードについて</h2>
          <p>
            QRコードには入力した氏名と詳細条件のみが含まれます。
            本アプリケーションはQRコードの生成機能のみを提供しており、カメラ機能へのアクセスや映像データの収集は行いません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-white">アクセス解析ツールについて</h2>
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
              className="text-[var(--primary)] underline"
              href="https://policies.google.com/technologies/partner-sites"
              rel="noopener noreferrer"
              target="_blank"
            >
              Googleポリシーと規約
            </a>
          </p>
        </section>

        <section className="rounded-lg border border-[var(--success)]/30 bg-[var(--success)]/10 p-4">
          <h2 className="mb-2 text-lg font-semibold text-[var(--success)]">
            プライバシーへのコミットメント
          </h2>
          <p>
            私たちはお客様のプライバシーを最優先に考え、同意内容などの機微な個人情報の収集は一切行いません。
          </p>
        </section>
      </div>
    </div>
  );
}
