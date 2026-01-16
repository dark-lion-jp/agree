'use client';

import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

/**
 * QRコード生成コンポーネント
 * フォームデータをJSON化してQRコードとして表示
 * @param {object} props - コンポーネントプロパティ
 * @param {object} props.formData - フォームの状態データ
 * @returns {JSX.Element} QRコード生成要素
 */
export default function QRGenerator({ formData }) {
  /**
   * QRコードに含めるデータを生成
   * URLパラメータとしてデータを埋め込む
   */
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const data = JSON.stringify({
    detailItems: formData.detailItems,
    name1: formData.name1,
    name2: formData.name2,
  });

  // URLを作成: baseUrl/?data=...
  const qrUrl = new URL(baseUrl);
  qrUrl.searchParams.set('data', data);
  const qrData = qrUrl.toString();

  const hasData = formData.name1 || formData.name2 || formData.detailItems.length > 0;

  return (
    <div className="glass-card p-6">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <QrCode className="h-5 w-5 text-[var(--primary)]" />
        QRコード生成
      </h2>

      <p className="mb-4 text-sm text-gray-400">
        入力した氏名と詳細項目をQRコードとして生成します。相手のスマートフォンで読み取ってデータを共有できます。
      </p>

      <div className="flex flex-col items-center">
        {hasData ? (
          <>
            <div className="rounded-lg bg-white p-4">
              <QRCodeSVG includeMargin={true} level="M" size={200} value={qrData} />
            </div>
            <p className="mt-4 text-sm text-gray-400">
              このQRコードをスキャンしてデータを読み取ってください
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center py-8 text-gray-500">
            <QrCode className="mb-2 h-16 w-16 opacity-30" />
            <p>氏名または詳細項目を入力するとQRコードが生成されます</p>
          </div>
        )}
      </div>

      {hasData && (
        <div className="mt-4 rounded-lg border border-[var(--surface-light)] bg-[var(--surface)] p-3">
          <p className="mb-1 text-xs text-gray-400">含まれるデータ:</p>
          <ul className="text-sm text-gray-300">
            {formData.name1 && <li>氏名1: {formData.name1}</li>}
            {formData.name2 && <li>氏名2: {formData.name2}</li>}
            {formData.detailItems.length > 0 && <li>詳細項目: {formData.detailItems.length}件</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
