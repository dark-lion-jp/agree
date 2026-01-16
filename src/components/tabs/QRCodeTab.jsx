'use client';

import QRGenerator from '../qr/QRGenerator';

/**
 * QRコードタブコンポーネント
 * QRコードの生成と読み取り機能を提供
 * @param {object} props - コンポーネントプロパティ
 * @param {object} props.formData - フォームの状態データ
 * @returns {JSX.Element} QRコードタブ要素
 */
export default function QRCodeTab({ formData }) {
  return (
    <div className="animate-fade-in space-y-6">
      <QRGenerator formData={formData} />
    </div>
  );
}
