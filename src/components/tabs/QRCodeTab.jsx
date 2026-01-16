'use client';

import QRGenerator from '../qr/QRGenerator';
import QRScanner from '../qr/QRScanner';

/**
 * QRコードタブコンポーネント
 * QRコードの生成と読み取り機能を提供
 * @param {object} props - コンポーネントプロパティ
 * @param {object} props.formData - フォームの状態データ
 * @param {function} props.onFormDataChange - フォームデータ変更時のコールバック
 * @returns {JSX.Element} QRコードタブ要素
 */
export default function QRCodeTab({ formData, onFormDataChange }) {
  /**
   * QRコードから読み取ったデータをフォームに反映
   * @param {object} data - 読み取ったデータ
   */
  const handleScanComplete = (data) => {
    if (data) {
      onFormDataChange({
        ...formData,
        detailItems: data.detailItems || formData.detailItems,
        name1: data.name1 || formData.name1,
        name2: data.name2 || formData.name2,
      });
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <QRGenerator formData={formData} />
      <QRScanner onScanComplete={handleScanComplete} />
    </div>
  );
}
