'use client';

import { Shield } from 'lucide-react';

/**
 * アプリケーションのヘッダーコンポーネント
 * アプリケーション名と免責事項を表示する
 * @returns {JSX.Element} ヘッダー要素
 */
export default function Header() {
  return (
    <header className="glass-card mb-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-[var(--primary)]" />
          <h1 className="gradient-text text-2xl font-bold">性的同意確認</h1>
        </div>
        <div className="mt-2 space-y-1 text-center text-xs text-gray-400">
          <p>
            本アプリは意思確認の補助ツールであり、
            <br className="sm:hidden" />
            法的拘束力はありません。
          </p>
          <p>脅迫・強要・泥酔状態での同意は無効です。</p>
          <p>同意はいつでも撤回可能です。</p>
        </div>
      </div>
    </header>
  );
}
