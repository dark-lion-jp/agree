'use client';

import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * リアルタイム日時表示コンポーネント
 * 1秒ごとに更新される現在日時を表示する
 * @returns {JSX.Element} 日時表示要素
 */
export default function DateTimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /**
   * 日時を日本語形式でフォーマットする
   * @param {Date} date - フォーマット対象の日時
   * @returns {string} フォーマットされた日時文字列
   */
  const formatDateTime = (date) => {
    return date.toLocaleString('ja-JP', {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'long',
      weekday: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="glass-card mb-4 p-4">
      <div className="flex items-center gap-2 text-gray-400">
        <Clock className="h-5 w-5" />
        <span className="text-sm">現在日時</span>
      </div>
      <p className="pulse-glow mt-2 rounded-lg border border-[var(--primary)]/30 bg-[var(--surface)] p-3 font-mono text-lg">
        {formatDateTime(currentTime)}
      </p>
    </div>
  );
}
