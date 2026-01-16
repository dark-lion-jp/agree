'use client';

import { Html5Qrcode } from 'html5-qrcode';
import { CheckCircle2, ImageIcon, Loader2, Shield, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * QRコード読み取りコンポーネント
 * 画像からQRコードを読み取る（html5-qrcode使用）
 * @param {object} props - コンポーネントプロパティ
 * @param {function} props.onScanComplete - 読み取り完了時のコールバック
 * @returns {JSX.Element} QRコード読み取り要素
 */
export default function QRScanner({ onScanComplete }) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const fileInputRef = useRef(null);

  // html5-qrcode インスタンスのcleanup用
  useEffect(() => {
    return () => {
      // コンポーネントアンマウント時のクリーンアップが必要であればここに記述
      // Html5QrcodeはDOM要素にバインドされないスキャン(scanFile)の場合、
      // 特段のclear処理は必須ではないが、進行中の処理があればキャンセルできるようにする
    };
  }, []);

  /**
   * 画像ファイルからQRコードを読み取る
   * @param {Event} e - ファイル選択イベント
   */
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setError(null);
    setSuccessMsg(null);

    const html5QrCode = new Html5Qrcode('reader');

    try {
      const decodedText = await html5QrCode.scanFile(file, true);
      // 成功時
      const data = JSON.parse(decodedText);
      setSuccessMsg('QRコードを読み取りました。フォームにデータを反映しました。');
      onScanComplete(data);
    } catch (err) {
      console.error('Error scanning file:', err);
      // エラーメッセージの振り分け
      if (err?.name === 'SyntaxError') {
        setError('QRコードの内容が本アプリの形式ではありません。');
      } else {
        setError('QRコードを検出できませんでした。別の画像を試してください。');
      }
    } finally {
      setIsScanning(false);
      // inputをリセットして同じファイルを再度選択できるようにする
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * ファイル選択ダイアログを開く
   */
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="glass-card p-6">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <Shield className="h-5 w-5 text-[var(--primary)]" />
        QRコード読み取り
      </h2>

      <p className="mb-6 text-sm text-gray-400">
        パートナーが作成したQRコードのスクリーンショットや画像を読み込み、氏名と詳細項目を反映します。
      </p>

      {/* html5-qrcode が内部で使用するID (画面には表示しない) */}
      <div id="reader" style={{ display: 'none' }}></div>

      <div className="flex flex-col gap-4">
        <input
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          ref={fileInputRef}
          type="file"
        />

        <button
          className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[var(--primary)]/50 bg-[var(--surface)] p-8 transition-all hover:bg-[var(--surface-light)] active:scale-[0.98]"
          disabled={isScanning}
          onClick={triggerFileInput}
        >
          {isScanning ? (
            <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
          ) : (
            <ImageIcon className="h-10 w-10 text-[var(--primary)]" />
          )}
          <span className="font-medium text-[var(--primary)]">
            {isScanning ? '解析中...' : '画像を選択して読み取り'}
          </span>
          <span className="text-xs text-gray-500">タップしてライブラリから画像を選択</span>
        </button>

        {error && (
          <div className="animate-fade-in flex items-center gap-2 rounded-lg border border-[var(--error)]/50 bg-[var(--error)]/10 p-3 text-sm text-[var(--error)]">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {successMsg && (
          <div className="animate-fade-in flex items-center gap-2 rounded-lg border border-[var(--success)]/50 bg-[var(--success)]/10 p-3 text-sm text-[var(--success)]">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            {successMsg}
          </div>
        )}
      </div>
    </div>
  );
}
