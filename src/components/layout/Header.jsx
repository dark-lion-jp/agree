'use client';

import { Shield } from 'lucide-react';

/**
 * アプリケーションのヘッダーコンポーネント
 * アプリケーション名と免責事項を表示する
 * @returns {JSX.Element} ヘッダー要素
 */
export default function Header() {
  return (
    <header className="glass-card mb-6 px-6 pt-5 pb-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 overflow-visible">
          <Shield className="h-16 w-16 text-[var(--primary)]" />
          <h1 className="gradient-text text-6xl font-bold leading-normal">Agree</h1>
        </div>
        <p className="text-lg text-gray-300">〜 相互同意確認ツール 〜</p>
        <div className="space-y-1 text-center text-sm text-gray-400">
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
