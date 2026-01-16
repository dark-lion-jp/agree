'use client';

import jsQR from 'jsqr';
import { Camera, CheckCircle2, ImageIcon, XCircle } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * QRコード読み取りコンポーネント
 * カメラまたは画像からQRコードを読み取る
 * @param {object} props - コンポーネントプロパティ
 * @param {function} props.onScanComplete - 読み取り完了時のコールバック
 * @returns {JSX.Element} QRコード読み取り要素
 */
export default function QRScanner({ onScanComplete }) {
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const scanFnRef = useRef(null);
  const streamRef = useRef(null);
  const videoRef = useRef(null);

  /**
   * カメラストリームを停止する
   */
  const stopCamera = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  }, []);

  // scanFnRef に最新の scanQRCode を保持
  useEffect(() => {
    /**
     * QRコードをスキャンする
     */
    const scanQRCode = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
        animationRef.current = requestAnimationFrame(scanQRCode);
        return;
      }

      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        try {
          const data = JSON.parse(code.data);
          setScanResult({ data, success: true });
          onScanComplete(data);
          stopCamera();
          return;
        } catch {
          // JSONではない場合は無視してスキャン継続
        }
      }

      animationRef.current = requestAnimationFrame(scanQRCode);
    };

    scanFnRef.current = scanQRCode;
  }, [onScanComplete, stopCamera]);

  /**
   * カメラを起動してスキャンを開始
   */
  const startCamera = async () => {
    setError(null);
    setScanResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsScanning(true);

        // ビデオが読み込まれたらスキャン開始
        videoRef.current.onloadedmetadata = () => {
          if (scanFnRef.current) {
            animationRef.current = requestAnimationFrame(scanFnRef.current);
          }
        };
      }
    } catch {
      setError('カメラへのアクセスが拒否されました。設定を確認してください。');
    }
  };

  /**
   * 画像ファイルからQRコードを読み取る
   * @param {Event} e - ファイル選択イベント
   */
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setScanResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          try {
            const data = JSON.parse(code.data);
            setScanResult({ data, success: true });
            onScanComplete(data);
          } catch {
            setError('QRコードのデータ形式が正しくありません。');
          }
        } else {
          setError('QRコードが見つかりませんでした。');
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // コンポーネントがアンマウントされた時にカメラを停止
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <div className="glass-card p-6">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <Camera className="h-5 w-5 text-[var(--primary)]" />
        QRコード読み取り
      </h2>

      <p className="mb-4 text-sm text-gray-400">
        カメラまたは画像からQRコードを読み取り、データをフォームに反映します。
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          {!isScanning ? (
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] py-3 font-medium transition-all hover:bg-[var(--primary-light)]"
              onClick={startCamera}
            >
              <Camera className="h-5 w-5" />
              カメラで読み取り
            </button>
          ) : (
            <button
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--error)] py-3 font-medium transition-all hover:opacity-90"
              onClick={stopCamera}
            >
              <XCircle className="h-5 w-5" />
              スキャン停止
            </button>
          )}

          <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--surface-light)] py-3 font-medium transition-all hover:bg-[var(--surface-light)]">
            <ImageIcon className="h-5 w-5" />
            画像から読み取り
            <input accept="image/*" className="hidden" onChange={handleImageUpload} type="file" />
          </label>
        </div>

        {isScanning && (
          <div className="relative overflow-hidden rounded-lg">
            <video className="w-full" muted playsInline ref={videoRef} />
            <canvas className="hidden" ref={canvasRef} />
            <div className="absolute inset-0 border-4 border-[var(--primary)] opacity-50" />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-[var(--error)]/50 bg-[var(--error)]/10 p-3 text-sm text-[var(--error)]">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {scanResult?.success && (
          <div className="flex items-center gap-2 rounded-lg border border-[var(--success)]/50 bg-[var(--success)]/10 p-3 text-sm text-[var(--success)]">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            QRコードを読み取りました。フォームにデータを反映しました。
          </div>
        )}
      </div>
    </div>
  );
}
